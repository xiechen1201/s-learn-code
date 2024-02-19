import {
	createSSRApp
} from 'vue'
import App from './App'
import store from './store/index.js'
import "./utils/request.js"
import "./utils/ui.js"

export function createApp() {
	const app = createSSRApp(App)
	app.use(store)

	return {
		app
	}
}
