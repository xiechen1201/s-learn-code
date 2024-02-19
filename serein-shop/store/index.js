import {
	createStore
} from 'vuex'
import moduleCart from "./module/cart.js"
import moduleUser from "./module/user.js"

const store = createStore({
	modules: {
		moduleCart,
		moduleUser
	}
})

export default store
