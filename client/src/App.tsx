import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter, push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import TransactionsView from "./transactions/TransactionsView";
import TimeReportView from "./time-report/TimeReportView";
import {
  Pane,
  Heading,
  Popover,
  Position,
  Menu as EvergreenMenu,
  Button,
  MoreIcon,
} from "evergreen-ui";
import { Menu } from "./common/Menu";
import { motion, useAnimation } from "framer-motion";
import Greeting from "./common/Greeting/Greeting";
import isAdminSelector from "./utils/isAdminSelector";
import {
  setImpersonateUser,
  fetchEmployees,
  Employee,
  fetchProjectsByUser,
  Project,
  fetchAllProjects,
} from "./app/slices/appSlice";
import ProjectView from "./projects/ProjectView";
import ProjectListView from "./projects/ProjectListView";
import { ErrorMessage } from "./common/ErrorMessage/ErrorMessage";

type AppProps = {
  accountInfo: any;
  onLogout: () => any;
  history: any;
};

const App = ({ accountInfo, onLogout, history }: AppProps) => {
  const dispatch = useDispatch();
  const impersonateUser = useSelector(
    (state: any) => state.app.impersonateUser
  );
  const titleControls = useAnimation();
  const contentControls = useAnimation();
  const stateIsAdmin: boolean = useSelector(isAdminSelector) as boolean;
  const isAdmin = process.env.REACT_APP_MOCK_IS_ADMIN === 'true' ? true : stateIsAdmin;
  const employees: Employee[] = useSelector(
    (state: any) => state.app.employees
  );

  const currentUser: Employee = impersonateUser
    ? impersonateUser
    : accountInfo && accountInfo.account.name
      ? {
        firstname: accountInfo.account.name.split(" ")[0],
        lastname: accountInfo.account.name.split(" ")[1],
        email: accountInfo.account.userName,
      }
      : null;

  useEffect(() => {
    titleControls.start({
      scale: [0, 3, 1],
      marginTop: ["40vh", "40vh", "2vh"],
      type: "spring",
    });
  }, [titleControls]);

  useEffect(() => {
    contentControls.start({
      opacity: [0, 1],
    });
  }, [contentControls]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const projects: Project[] = useSelector((state: any) => state.app.projects);  // TODO Känns lite onödigt? 

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllProjects());
    } else {
      dispatch(fetchProjectsByUser(currentUser));
    }
  }, [dispatch]);

  const currentRoute = useSelector(
    (state: any) => state.router.location.pathname
  );
  return (
    <ConnectedRouter history={history}>
      <Pane marginX="auto" maxWidth="1000px" marginTop="40px">
        <motion.div
          style={{ opacity: 0 }}
          animate={contentControls}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 1],
            delay: 0,
          }}
        >
          <Heading
            size={900}
            marginBottom="20px"
            color="white"
            textAlign="center"
          >
            {currentUser && (
              <>
                <Greeting name={currentUser.firstname} />
                {isAdmin && (
                  <Popover
                    position={Position.BOTTOM_LEFT}
                    content={({ close }) =>
                      <EvergreenMenu>
                        <EvergreenMenu.Group>
                          {employees.map((employee) => (
                            <EvergreenMenu.Item
                              onSelect={() => {
                                close();
                                dispatch(setImpersonateUser(employee));
                              }
                              }
                            >
                              {employee.firstname}
                            </EvergreenMenu.Item>
                          ))}
                        </EvergreenMenu.Group>
                      </EvergreenMenu>
                    }
                  >
                    <Button
                      marginLeft={5}
                      padding={5}
                      fontSize={8}
                      appearance="minimal"
                      intent="none"
                    >
                      <MoreIcon />
                    </Button>
                  </Popover>
                )}
              </>
            )}
          </Heading>
          <Pane textAlign="center" marginBottom="20px">
            <Menu>
              <Menu.Item
                title="Personlig balansräkning"
                onSelect={() => dispatch(push("/pbr"))}
                isSelected={currentRoute === "/pbr"}
              ></Menu.Item>
              <Menu.Item
                title="Timmar"
                onSelect={() => dispatch(push("/hours"))}
                isSelected={currentRoute === "/hours"}
              ></Menu.Item>
              {isAdmin ? (
                <Menu.Item
                  title="Admin"
                  isSelected={currentRoute === "/project"}
                  onSelect={() => {
                  }}
                >
                  <Menu.SubItem
                    title="Projekt"
                    onSelect={() => dispatch(push("/project"))}
                  ></Menu.SubItem>
                </Menu.Item>
              ) : <></>}
            </Menu>
          </Pane>
          <Switch>
            <Route
              exact
              path="/pbr"
              render={() => (
                <TransactionsView jwtToken={accountInfo.jwtIdToken} user={currentUser} isAdmin={isAdmin} />
              )}
            />
            <Route
              exact
              path="/hours"
              render={() => (
                <TimeReportView jwtToken={accountInfo.jwtIdToken} user={currentUser} isAdmin={isAdmin} />
              )}
            />
            <Route exact path="/" render={() => <Redirect to="/pbr" />} />
            <Route exact path="/project" render={() => (isAdmin ? <ProjectListView user={currentUser} /> : <ErrorMessage title={"401 - Vi är väldigt ledsna, du har ingen behörighet till sidan och vi kan verkligen inte göra nånting. Ring Jonatan."} />)} />
            <Route exact path="/project/:projectId"
              render={() => (isAdmin ? (projects.length && <ProjectView user={currentUser} />) : <ErrorMessage title={"401 - Du saknar behörighet!"} />)} />
            <Route path='*' exact={true} render={() => <ErrorMessage title={"404 - Sidan finns inte."} />} />

          </Switch>
        </motion.div>
      </Pane>
    </ConnectedRouter >
  );
};

export default App;
function componentDidMount() {
  throw new Error("Function not implemented.");
}

