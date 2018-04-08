import LoginContainer from './containers/login'
import RegisterContainer from './containers/register'
import ForgotPasswordContainer from './containers/forgotpassword'
import ResetPasswordContainer from './containers/resetpassword'

export default [
	{
		name: 'Login',
		pathname: '/login',
		component: LoginContainer,
    navigation: true,
	},
	{
		name: 'Register',
		pathname: '/register',
		component: RegisterContainer,
    navigation: true,
	},
  {
    name: 'ForgotPassword',
    pathname: '/forgotpassword',
    component: ForgotPasswordContainer,
    navigation: false,
  },
  {
    name: 'ResetPassword',
    pathname: '/resetpassword',
    component: ResetPasswordContainer,
    navigation: false,
  }
]
