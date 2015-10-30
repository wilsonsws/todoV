/*!
 * myTODO.js 
 * (c) wilsonsws
 * Released under the MIT License.
 * this is the untested vueapp.js .
 */
var todoapp = new Vue({

		// the root element that will be compiled
		el: '#todoapp',
		alert(err)

		// app initial state
		data: {
			content = '';
			fstatus = '';
			todos = storedb('todos').find();
			edit = false;
			incomplete = false;
			timer = '0';
		},

		// watch todos change for localStorage persistence
		watch: {
			content: {
				handler: function() {
					this.incomplete = false;
					if (this.content.length) {
						this.incomplete = true;
					}
				},
				deep: true
			}
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		/*
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},
		*/
		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

			creatItem : function() {
			this.edit = false;
		},
 
		editItem : function(time) {
			this.edit = true;
			var olddata = storedb('todos').find({"time":time});
			this.timer = olddata[0].time;
			this.content = olddata[0].content;
		},

		changeFinish : function(time) {
			storedb('todos').update({"time":time}, {"$set":{"fstatus":true}},function(err){
					if(!err){ this.todos = storedb('todos').find();} 
					else {alert(err)}
			})
		},

		changeRelease : function(time) {
			storedb('todos').update({"time":time}, {"$set":{"fstatus":false}},function(err){
					if(!err){ this.todos = storedb('todos').find();} 
					else {alert(err)}
			})
		},

		deletItem : function(time) {
			storedb('todos').remove({"time":time},function(err){
					if(!err){ this.todos = storedb('todos').find();} 
					else {alert(err)}
			})
		},

		updateItem : function(){
			if (!this.edit){
				var tid = new Date();
				var newtime = tid.getTime();
				storedb('todos').insert({"time":newtime, "content":this.content, "fstatus":this.fstatus },function(err){
					if(!err){ this.todos = storedb('todos').find();} 
					else {alert(err)}
					})
			}
			else {
					storedb('todos').update({"time":this.timer}, {"$set":{"content":this.content}},function(err){
					if(!err){ this.todos = storedb('todos').find(); this.edit = false;} 
					else {alert(err)}
					})
				}
		},
		
		rreset : function(){ 
			localStorage.clear(); 
			this.todos = storedb('todos').find();
		}

		},

		Vue.directive('disabled', {
			// 每当绑定的数据变化时，这个函数就被调用啦
			update: function (value) {
			// 这里的 this 指向一个directive对象。
			// this.el 指向当前被绑定的DOM元素
			// value则是所绑定数据的新值
			this.el.disabled = !!value
			}
		})
	});