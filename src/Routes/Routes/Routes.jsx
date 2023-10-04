import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import HomeLayout from "../../Layouts/HomeLayout/HomeLayout";
import Exercises from "../../Pages/Exercise Pages/Exercises/Exercises";
import Clients from "../../Pages/ClientsPages/Clients/Clients";
import ExerciseLayout from "../../Layouts/ExerciseLayout/ExerciseLayout";
import Pending from "../../Pages/ClientsPages/Pending/Pending";
import Offline from "../../Pages/ClientsPages/Offline/Offline";
import WaittingPage from "../../Pages/ClientsPages/WaittingPage/WaittingPage";
import Connected from "../../Pages/ClientsPages/Connected/Connected";
import Profile from "../../Pages/ClientsPages/ProfileDetails/Profile/Profile";
import ProfileLayout from "../../Layouts/ProfileLayout/ProfileLayout";
import Workouts from "../../Pages/Exercise Pages/Workouts/Workouts";
import Sections from "../../Pages/Exercise Pages/Sections/Sections";
import Programs from "../../Pages/Exercise Pages/Programs/Programs";
import ETasks from "../../Pages/Exercise Pages/Tasks/Tasks";
import Calender from "../../Pages/ClientsPages/ProfileDetails/Calender/Calender";
import Tasks from "../../Pages/ClientsPages/ProfileDetails/Tasks/Tasks";
import FoodJournal from "../../Pages/ClientsPages/ProfileDetails/FoodJournal/FoodJournal";
import Macros from "../../Pages/ClientsPages/ProfileDetails/Macros/Macros";
import Studio from "../../Pages/ClientsPages/ProfileDetails/Studio/Studio";
import Documents from "../../Pages/ClientsPages/ProfileDetails/Documents/Documents";
import Settings from "../../Pages/ClientsPages/ProfileDetails/Settings/Settings";
import Login from "../../Shared/Login/Login";
import SignUp from "../../Shared/SignUp/SignUp";
import MetricsLayout from "../../Layouts/MetricsLayout/MetricsLayout";
import BodyFat from "../../Pages/ClientsPages/MetricPages/BodyFat/BodyFat";
import Weight from "../../Pages/ClientsPages/MetricPages/Weight/Weight";
import SkeletalMuscleMass from "../../Pages/ClientsPages/MetricPages/SkeletalMuscleMass/SkeletalMuscleMass";
import FatMass from "../../Pages/ClientsPages/MetricPages/FatMass/FatMass";
import Steps from "../../Pages/ClientsPages/MetricPages/Steps/Steps";
import ExerciseMetricsLayout from "../../Layouts/ExerciseMetricsLayout/ExerciseMetricsLayout";
import ExerciseMetrics from "../../Pages/ClientsPages/ExerciseMetricsPages/ExerciseMetrics/ExerciseMetrics";
import LyingLegCurls from "../../Pages/ClientsPages/ExerciseMetricsPages/LyingLegCurls/LyingLegCurls";
import SmithMachinePress from "../../Pages/ClientsPages/ExerciseMetricsPages/SmithMachinePress/SmithMachinePress";
import NeedProgramming from "../../Pages/ClientsPages/NeedProgramming/NeedProgramming";
import EntireTeam from "../../Pages/ClientsPages/EntireTeam/EntireTeam";
import MenuLayout from "../../Layouts/MenuLayout/MenuLayout";
import SettingLayout from "../../Layouts/SettingLayout/SettingLayout";
import Teammates from "../../Pages/SettingPages/Teammates/Teammates";
import Billing from "../../Pages/SettingPages/Billing/Billing";
import AutoFlow from "../../Pages/MenuPages/AutoFlow/AutoFlow";
import StudioLayout from "../../Layouts/StudioLayout/StudioLayout";
import CommunityForums from "../../Pages/MenuPages/CommunityForums/CommunityForums";
import ReferCoach from "../../Pages/MenuPages/ReferCoach/ReferCoach";
import PaymentLayout from "../../Layouts/PaymentLayout/PaymentLayout";
import Packages from "../../Pages/PaymentPages/Packages/Packages";
import Product from "../../Pages/PaymentPages/Product/Product";
import ResourceCollections from "../../Pages/StudioPages/ResourceCollections/ResourceCollections";
import Resources from "../../Pages/StudioPages/Resources/Resources";
import WorkoutCollections from "../../Pages/StudioPages/WorkoutCollections/WorkoutCollections";
import OndemandWorkout from "../../Pages/StudioPages/OndemandWorkout/OndemandWorkout";
import WorkoutLabels from "../../Pages/StudioPages/WorkoutLabels/WorkoutLabels";
import StudioPrograms from "../../Pages/StudioPages/StudioPrograms/StudioPrograms";
import OndemandSettings from "../../Pages/StudioPages/OndemandSettings/OndemandSettings";
import AccountDetails from "../../Pages/SettingPages/AccountDetails/AccountDetails";
import Notifications from "../../Pages/SettingPages/Notifications/Notifications";
import DefaultSettings from "../../Pages/SettingPages/DefaultSettings/DefaultSettings";
import TeamSettings from "../../Pages/SettingPages/TeamSettings/TeamSettings";
import CustomBranding from "../../Pages/SettingPages/CustomBranding/CustomBranding";
import MessageLayout from "../../Layouts/MessageLayout/MessageLayout";
import Message from "../../Pages/MesagePage/Message/Message";
import WorkoutList from "../../Pages/StudioPages/WorkoutList/WorkoutList";
import InvitePage from "../../Shared/InvitePage/InvitePage";
import AutoFlowLayout from "../../Layouts/AutoFlowLayout/AutoFlowLayout";
import AutoFlowTraning from "../../Pages/AutoFlowPages/AutoFlowTraning/AutoFlowTraning";
import AutoflowLeaderboard from "../../Pages/AutoFlowPages/AutoflowLeaderboard/AutoflowLeaderboard";
import AutoFlowTask from "../../Pages/AutoFlowPages/AutoFlowTask/AutoFlowTask";
import AutoFlowMessage from "../../Pages/AutoFlowPages/AutoFlowMessage/AutoFlowMessage";
import AutoFlowClient from "../../Pages/AutoFlowPages/AutoFlowClient/AutoFlowClient";
import AutoFlowSetting from "../../Pages/AutoFlowPages/AutoFlowSetting/AutoFlowSetting";
import FormsQuestions from "../../Pages/Exercise Pages/FormsQuestions/FormsQuestions.jsx";
import ResourceSingle from "../../Pages/StudioPages/ResourceSingle/ResourceSingle";
import { SpecificQuestionPage } from "../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage";
import Hip from "../../Pages/ClientsPages/MetricPages/Hip/Hip";
import BmiPage from "../../Pages/ClientsPages/MetricPages/BmiPage/BmiPage";
import CalfPage from "../../Pages/ClientsPages/MetricPages/CalfPage/CalfPage";
import ChestPage from "../../Pages/ClientsPages/MetricPages/ChestPage/ChestPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
                children: [
                    {
                        path: '/',
                        element: <Clients />
                    },
                    {
                        path: '/connected',
                        element: <Connected />
                    },
                    {
                        path: '/pending',
                        element: <Pending />
                    },
                    {
                        path: '/offline',
                        element: <Offline />
                    },
                    {
                        path: '/watting',
                        element: <WaittingPage />
                    },
                    {
                        path: '/needprogramming',
                        element: <NeedProgramming />
                    },
                    {
                        path: '/entireteam',
                        element: <EntireTeam />
                    },
                    {
                        path: '/profile/:id',
                        element: <ProfileLayout />,
                        children: [
                            {
                                path: '/profile/:id',
                                element: <Profile />
                            },
                            {
                                path: '/profile/:id/traning',
                                element: <Calender />
                            },
                            {
                                path: '/profile/:id/task',
                                element: <Tasks />
                            },
                            {
                                path: '/profile/:id/metrics',
                                element: <MetricsLayout />,
                                children: [
                                    {
                                        path: '/profile/:id/metrics',
                                        element: <BodyFat />
                                    },
                                    {
                                        path: '/profile/:id/metrics/weight',
                                        element: <Weight />
                                    },
                                    {
                                        path: '/profile/:id/metrics/hip',
                                        element: <Hip />
                                    },
                                    {
                                        path: '/profile/:id/metrics/bmi',
                                        element: <BmiPage />
                                    },
                                    {
                                        path: '/profile/:id/metrics/calf',
                                        element: <CalfPage />
                                    },
                                    {
                                        path: '/profile/:id/metrics/chest',
                                        element: <ChestPage />
                                    },
                                    {
                                        path: '/profile/:id/metrics/sketetalmass',
                                        element: <SkeletalMuscleMass />
                                    },
                                    {
                                        path: '/profile/:id/metrics/fatmass',
                                        element: <FatMass />
                                    },
                                    {
                                        path: '/profile/:id/metrics/steps',
                                        element: <Steps />
                                    },
                                ]
                            },
                            {
                                path: '/profile/:id/exercise',
                                element: <ExerciseMetricsLayout />,
                                children: [
                                    {
                                        path: '/profile/:id/exercise',
                                        element: <ExerciseMetrics />,
                                    },
                                    {
                                        path: '/profile/:id/exercise/layinglegcurls',
                                        element: <LyingLegCurls />
                                    },
                                    {
                                        path: '/profile/:id/exercise/smithmachinepress',
                                        element: <SmithMachinePress />
                                    }
                                ]
                            },
                            {
                                path: '/profile/:id/food-journal',
                                element: <FoodJournal />
                            },
                            {
                                path: '/profile/:id/macros',
                                element: <Macros />
                            },
                            {
                                path: '/profile/:id/studio',
                                element: <Studio />
                            },
                            {
                                path: '/profile/:id/documents',
                                element: <Documents />
                            },
                            {
                                path: '/profile/:id/settings',
                                element: <Settings />
                            },
                        ]
                    }

                ]
            },
            {
                path: '/exersise',
                element: <ExerciseLayout />,
                children: [
                    {
                        path: '/exersise',
                        element: <Exercises />
                    },
                    {
                        path: '/exersise/workouts',
                        element: <Workouts />
                    },
                    {
                        path: '/exersise/sections',
                        element: <Sections />
                    },
                    {
                        path: '/exersise/programs',
                        element: <Programs />
                    },
                    {
                        path: '/exersise/tasks',
                        element: <ETasks />
                    },
                    {
                        path: '/exersise/forms',
                        element: <FormsQuestions />
                    },
                    {
                        path: '/exersise/forms/:id',
                        element: <SpecificQuestionPage />
                    },

                ]
            },
            {
                path: '/inbox/:id',
                element: <MessageLayout />,
                children: [
                    {
                        path: '/inbox/:id',
                        element: <Message ></Message>
                    },
                    // {
                    //     path: '/inbox/:id',
                    //     element: <Message></Message>
                    // }
                ]
            },
            {
                path: '/menu',
                element: <MenuLayout />,
                children: [
                    {
                        path: '/menu',
                        element: <AutoFlow />
                    },
                    // {
                    //     path: '/menu/autoflow',
                    //     element: <AutoFlow />
                    // },
                    {
                        path: '/menu/autoflow/:id',
                        element: <AutoFlowLayout />,
                        children: [
                            {
                                path: '/menu/autoflow/:id',
                                element: <AutoFlowTraning />
                            },
                            {
                                path: '/menu/autoflow/:id/leaderboard',
                                element: <AutoflowLeaderboard />
                            },
                            {
                                path: '/menu/autoflow/:id/autoflowtask',
                                element: <AutoFlowTask />
                            },
                            {
                                path: '/menu/autoflow/:id/autoflowmessage',
                                element: <AutoFlowMessage />
                            },
                            {
                                path: '/menu/autoflow/:id/autoflowclient',
                                element: <AutoFlowClient />
                            },
                            {
                                path: '/menu/autoflow/:id/autoflowsetting',
                                element: <AutoFlowSetting />
                            },
                        ]
                    },
                    {
                        path: '/menu/community',
                        element: <CommunityForums />
                    },
                    {
                        path: '/menu/refercoach',
                        element: <ReferCoach />
                    }
                ]
            },
            {
                path: '/studio',
                element: <StudioLayout />,
                children: [
                    {
                        path: '/studio',
                        element: <ResourceCollections />
                    },
                    {
                        path: '/studio/singleStudio/:id',
                        element: <ResourceSingle />
                    },
                    {
                        path: '/studio/resources',
                        element: <Resources />
                    },
                    {
                        path: '/studio/workout',
                        element: <WorkoutCollections />
                    },
                    {
                        path: '/studio/ondemandworkout',
                        element: <OndemandWorkout />
                    },
                    {
                        path: '/studio/workoutlabel',
                        element: <WorkoutLabels />
                    },
                    {
                        path: '/studio/workoutlabel/:id',
                        element: <WorkoutList />
                    },
                    {
                        path: '/studio/studioprogram',
                        element: <StudioPrograms />
                    },
                    {
                        path: '/studio/ondemandsetting',
                        element: <OndemandSettings />
                    }
                ]
            },
            {
                path: '/setting',
                element: <SettingLayout />,
                children: [
                    {
                        path: '/setting/teammates',
                        element: <Teammates />
                    },
                    {
                        path: '/setting/account',
                        element: <AccountDetails />
                    },
                    {
                        path: '/setting/notification',
                        element: <Notifications />
                    },
                    {
                        path: '/setting/defaultsetting',
                        element: <DefaultSettings />
                    },
                    {
                        path: '/setting/teamsetting',
                        element: <TeamSettings />
                    },
                    {
                        path: '/setting/custombranding',
                        element: <CustomBranding />
                    },
                    {
                        path: '/setting/billing',
                        element: <Billing />
                    }
                ]
            },
            {
                path: '/payment',
                element: <PaymentLayout />,
                children: [
                    {
                        path: '/payment',
                        element: <Packages />
                    },
                    {
                        path: '/payment/product',
                        element: <Product />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/invitation/:id',
        element: <InvitePage />
    }
])