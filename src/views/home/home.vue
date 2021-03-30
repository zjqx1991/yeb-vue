<!-- Home页 -->
<template>
  <div class="">
    <el-container>
      <el-header class="homeHeader">
        <div class="title">云E办</div>
        <div>
          <el-dropdown @command="onClickMenu">
            <img :src="this.userInfo.userface" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: white">{{ this.userInfo.username }}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 启用 router 路由 -->
          <el-menu router>
            <template v-for="(item, index) in routes">
              <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
                <template slot="title"
                  ><i
                    :class="item.iconCls"
                    style="color: #2accff; margin-right: 8px"
                  ></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="subItem.path"
                  v-for="(subItem, subIndex) in item.children"
                  :key="subIndex"
                >
                  <span>{{ subItem.name }}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { LOGOUT_URL } from '../../utils/apiUrlConst';
import { TOKEN_KEY, USERINFO_KEY } from "../../utils/const_utils";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Home",
  components: {},
  data() {
    //这里存放数据
    return {
      userInfo: {
        id: 0,
        name: "",
        enabled: 0,
        address: "",
        phone: "",
        username: "",
        userface: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    routes() {
      // 从计算属性中获取路由列表
      console.log(this.$store.state.routes.length);
      return this.$store.state.routes;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickMenu(command) {
      switch(command) {
        case 'logout': {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          // 注销登录
          this.POST(LOGOUT_URL);
          // 清空用户信息
          window.sessionStorage.removeItem(USERINFO_KEY)
          // 清空token
          window.sessionStorage.removeItem(TOKEN_KEY)
          // 清空菜单
          this.$store.commit('initRoutes', [])
          // 跳转到登录页
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
          break
        }
      }
      
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let user = JSON.parse(window.sessionStorage.getItem(USERINFO_KEY))
    if (user) {
      this.userInfo = user
    }
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
.homeHeader {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: white;
}
.homeHeader img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 10px;
}

</style>