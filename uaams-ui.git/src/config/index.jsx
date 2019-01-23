const Main = {
    //target:'http://111.202.232.179',//http://192.168.100.166:9080  http://192.168.100.144:9080 //http://119.61.64.104:9080 //http://111.202.232.179
    target:'http://localhost:9080',
	name: 'react',
    prefix: 'react',
		testData : false,
    footerText: '国家药品不良反应监测中心 | 京ICP备16043083号-2',
    logoSrc: '',
    logoText: '用户权限管理系统',
    needLogin: true,
		message: { // 提示信息
				usernameInput: '请输入用户名',
        usernameEng: '用户名必须是字母',
				passwordInput: '请输入密码',
				loginError: '用户名或者密码错误!'
		},
		localKey: { // 本地存储Key
			userToken: 'USER_AUTHORIZATION'
		},
	/**
	 * 只能输入英文
	 *
	 * @param {any} str
	 * @returns
	 */
	checkEng(str) {
		var reg = new RegExp(/^[A-Za-z]+$/);
		return str && reg.test(str);
	},
    /**
	 * 参数格式化
	 *
	 * @param {any} data
	 * @returns
	 */
	paramFormat(data) {
		let paramArr = [];
		let paramStr = '';
		for(let attr in data) {
			paramArr.push(attr + '=' + data[attr]);
		}
		paramStr = paramArr.join('&');
		return paramStr ? '?' + paramStr : paramStr;
	},
    /**
	 * 本地数据存储或读取
	 *
	 * @param {any} key
	 * @param {any} value
	 * @returns
	 */
	localItem(key, value) {
		if(arguments.length == 1) {
			return sessionStorage.getItem(key) && sessionStorage.getItem(key) !== 'null' ? sessionStorage.getItem(key) : null;
		} else {
			return sessionStorage.setItem(key, value);
		}
	},
	/**
	 * 删除本地数据
	 *
	 * @param {any} k
	 * @returns
	 */
	removeLocalItem(key) {
		if(arguments.length == 1) {
			return sessionStorage.removeItem(key);
		} else {
			return sessionStorage.clear();
		}
	}
};

export default Main;
