import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import UserPage from '../pages/UserPage'
import AboutPage from '../pages/AboutPage'
import BookingPage from '../pages/BookingPage'
import DetailingPackagesPage from '../pages/DetailingPackagesPage'
import NotFoundPage from '../pages/NotFoundPage'
import ContactPage from '../pages/ContactPage';

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                index:true,
                element: <HomePage/>
            },
            {
                path:'signup/',
                element: <SignUpPage/>
            },
            {
                path:'user/',
                element: <UserPage/>
            },
            {
                path:'booking/',
                element: <BookingPage/>
            },
            {
                path:'detailingpackages/',
                element: <DetailingPackagesPage/>
            },
            {
                path:'about/',
                element: <AboutPage/>
            },
            {
                path:'contact/',
                element: <ContactPage/>
            }
        ],
        errorElement:<NotFoundPage/>
    }
])

export default router