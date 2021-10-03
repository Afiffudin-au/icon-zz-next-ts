import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
const progress = new ProgressBar({
  size: 4,
  color: '#ff0f0f',
  className: 'z-50',
  delay: 100,
})
// progress.start()
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
