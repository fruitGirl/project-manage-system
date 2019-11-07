/*
 * @Description: 产品-首页-基本信息
 * @Author: xiaojian
 * @Date: 2019-06-17 14:34:18
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 18:13:12
 */
<template>
  <section class="card-section">
    <div class="section-header">
      <div>
        <h2 class="title">基本信息</h2>
        <span v-if="data.status" class="status">{{ data.status.message }}</span>
      </div>
      <pm-link :to="editPath">
        <span class="extra"> <i class="el-icon-plus"></i> 编辑 </span>
      </pm-link>
    </div>
    <article class="content">
      <section class="item">
        <span class="item-title">负责人</span>
        <div class="item-content">
          <div class="el-form-item">
            <label class="el-form-item__label">产品 :</label>
            <div class="el-form-item__content">
              {{ data.productManager }}
            </div>
          </div>
          <div class="el-form-item">
            <label class="el-form-item__label">开发 :</label>
            <div class="el-form-item__content">
              {{ data.developManager }}
            </div>
          </div>
          <div class="el-form-item">
            <label class="el-form-item__label">测试 :</label>
            <div class="el-form-item__content">
              {{ data.testManager }}
            </div>
          </div>
        </div>
      </section>
      <section class="item">
        <span class="item-title">信息</span>
        <div class="item-content">
          <div class="el-form-item">
            <label class="el-form-item__label">创建 :</label>
            <div class="el-form-item__content">
              {{ data.creator }}
            </div>
          </div>
          <div class="el-form-item">
            <label class="el-form-item__label">创建时间 :</label>
            <div class="el-form-item__content">
              {{ formatValue(data.gmtCreate) }}
            </div>
          </div>
          <div class="el-form-item">
            <label class="el-form-item__label">产品描述 :</label>
            <div class="el-form-item__content">
              {{ formatValue(data.description) }}
            </div>
          </div>
          <div class="el-form-item">
            <label class="el-form-item__label">访问权限 :</label>
            <div class="el-form-item__content">
              {{ data.visitType ? formatValue(data.visitType.message) : '-' }}
            </div>
          </div>
        </div>
      </section>
    </article>
  </section>
</template>
<script>
import pmLink from '@/components/common/pm-link';
export default {
  components: {
    pmLink
  },
  props: {
    productId: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      editPath: `/product/product-setting`
    };
  },
  methods: {
    formatValue(value) {
      if (!value) {
        return '-';
      }
      return value;
    }
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}
.status {
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background-color: #ffa02f;
  border-radius: 3px;
}
.content {
  padding-left: 0;
}
.item {
  margin-bottom: 10px;
}
.item-title {
  display: inline-block;
  &:before {
    content: ' ';
    display: inline-block;
    height: 15px;
    width: 3px;
    margin-right: 3px;
    vertical-align: -2px;
    background: #1687d9;
  }
}
.item-content {
  padding-left: 45px;
}
</style>
