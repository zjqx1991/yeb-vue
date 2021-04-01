<!-- 职位管理 -->
<template>
  <div class="">
    <div>
      <el-form :inline="true" :model="jobsData" class="demo-form-inline">
        <el-form-item>
          <el-input
            size="small"
            v-model="jobsData.name"
            placeholder="添加职位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="addJobs"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="职位" width="180">
        </el-table-column>
        <el-table-column prop="createdate" label="创建时间"> </el-table-column>
        <el-table-column prop="enabled" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled == 1" type="success">
              已启用
            </el-tag>
            <el-tag v-if="scope.row.enabled == 0" type="info"> 未启用 </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onClickInfo(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button type="text" size="small" @click="onClickEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="danger">
      <el-button :disabled="disabled" type="danger" @click="deleteBatch"
        >批量删除</el-button
      >
    </div>
    <div>
      <el-dialog :visible.sync="showDialog" width="350px">
        <div>
          <el-tag size="small">职位名称</el-tag>
          {{ infoData.name }}
        </div>
        <div>
          <el-tag size="small">创建时间</el-tag>
          {{ infoData.createdate }}
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="职位编辑" :visible.sync="dialogEditJobs">
        <el-form :model="infoData">
          <el-form-item>
            <el-tag>职位名称</el-tag>
            <el-input
              class="editInput"
              size="small"
              v-model="infoData.name"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-tag class="tagEnabled">状态</el-tag>
            <el-switch
              v-model="infoData.enabled"
              active-color="#13ce66"
              inactive-color="#dddddd"
              active-text="启用"
              inactive-text="关闭"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditJobs = false">取 消</el-button>
          <el-button type="primary" @click="onClickUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  SYSTEM_BASIC_POSITION_LIST_URL,
  SYSTEM_BASIC_POSITION_SAVE_URL,
  SYSTEM_BASIC_POSITION_UPDATE_URL,
  SYSTEM_BASIC_POSITION_DELETE_URL,
} from "../../../utils/apiUrlConst";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      jobsData: {
        id: null,
        name: "",
      },
      infoData: {
        id: null,
        name: "",
        createdate: "",
        enabled: 1,
      },
      tableData: [],
      multipleSelection: [],
      disabled: true,
      showDialog: false,
      dialogEditJobs: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 新增职位
    addJobs() {
      this.POST(SYSTEM_BASIC_POSITION_SAVE_URL, this.jobsData).then((res) => {
        if (0 == res.code) {
          this.getJobsList();
          this.$message({
            message: "新增职位成功",
            type: "success",
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取职位列表
    getJobsList() {
      this.GET(SYSTEM_BASIC_POSITION_LIST_URL).then((res) => {
        if (0 == res.code) {
          this.tableData = res.data;
          if (res.msg) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
          this.jobsData = {};
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.disabled = this.multipleSelection.length == 0;
    },
    deleteBatch() {
      let ids = [];
      this.multipleSelection.forEach((item, index) => {
        ids[index] = item.id;
      });
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.POST(SYSTEM_BASIC_POSITION_DELETE_URL, ids).then((res) => {
            if (0 == res.code) {
              this.getJobsList();
              this.$message({
                  message: "删除成功",
                  type: "success",
                });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onClickInfo(data) {
      this.showDialog = true;
      Object.assign(this.infoData, data);
    },
    onClickEdit(data) {
      console.log(data);
      this.dialogEditJobs = true;
      Object.assign(this.infoData, data);
    },
    onClickUpdate() {
      this.POST(SYSTEM_BASIC_POSITION_UPDATE_URL, this.infoData).then((res) => {
        if (0 == res.code) {
          this.dialogEditJobs = false;
          this.$message({
            message: "更新职位成功",
            type: "success",
          });
          this.getJobsList();
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getJobsList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.danger {
  margin-top: 10px;
}
.editInput {
  margin-left: 10px;
  width: 250px;
}
.tagEnabled {
  margin-right: 10px;
}
</style>