<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span='7' class='pos-order' id='order-list'>
          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data='tabledata' style="width: 100%" border stripe>
                <el-table-column prop='goodsName' label='商品名称' width='105px'></el-table-column>
                <el-table-column prop='count' label="数量" width="70px"></el-table-column>
                <el-table-column prop='price' label='金额' width="70px"></el-table-column>
                <el-table-column label='操作' fixed="right" width='124px'>
                  <template scope="scope">
                    <el-button type="text" size="small" @click='delOrderlist(scope.row)'>删除</el-button>
                    <el-button type="text" size="small" @click='addOrderList(scope.row)'>增加</el-button>

                  </template>
                </el-table-column>
              </el-table>
              <div class='div-total'>
                <small>数量：</small>{{totalCount}} &nbsp;&nbsp; &nbsp;
                <small> 金额：</small>{{totalmoney}}
              </div>
              <div class='div-btn'>
                <el-button type="warning" size="small">挂单</el-button>
                <el-button type="danger" size="small" @click="delallgoods">删除</el-button>
                <el-button type="success" size="small" @click='checkout'>结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for='item in oftenGoods' :goodsId='item.price' @click='addOrderList(item)'>
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">￥{{item.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class='goods-type'>
            <el-tabs>
              <el-tab-pane label="汉堡">
                <div>
                  <ul class='cookList'>
                    <li v-for="item in type0Goods" :goodsId='item.goodsId' @click='addOrderList(item)'>
                      <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">￥{{item.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <div>
                  <ul class='cookList'>
                    <li v-for="item in type1Goods" :goodsId='item.goodsId' @click='addOrderList(item)'>
                      <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">￥{{item.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                  <ul class='cookList'>
                    <li v-for="item in type2Goods" :goodsId='item.goodsId' @click='addOrderList(item)'>
                      <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">￥{{item.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <div>
                  <ul class='cookList'>
                    <li v-for="item in type3Goods" :goodsId='item.goodsId' @click='addOrderList(item)'>
                      <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">￥{{item.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {

  name: 'Pos',
  data() {
    return {
      tabledata: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalmoney: 0,
      totalCount: 0,
    }
  },
  methods: {
    addOrderList: function(goods) {
      let isHave = false;

      for (let i = 0; i < this.tabledata.length; i++) {
        if (this.tabledata[i].goodsId == goods.goodsId) {
          isHave = true;
        };
      }
      if (isHave) {
        let arr = this.tabledata.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          count: 1,
          price: goods.price
        }
        this.tabledata.push(newGoods);
      }
      this.getalltotalmoney()
    },
    delOrderlist: function(goods) {
      this.tabledata = this.tabledata.filter(o => o.goodsId != goods.goodsId);
      this.getalltotalmoney()
    },
    delallgoods: function() {
      this.tabledata = [];
      this.totalmoney = 0;
      this.totalCount = 0;

    },
    getalltotalmoney: function() {
      this.totalmoney = 0;
      this.totalCount = 0;
      this.tabledata.forEach((element) => {
        this.totalCount += element.count;
        this.totalmoney = this.totalmoney + (element.price * element.count);
      });
    },
    // 模拟结账
    checkout() {
      if (this.totalCount != 0) {
        this.tabledata = [];
        this.totalmoney = 0;
        this.totalCount = 0;
        this.$message({
          message:'結賬成功，感謝你又為店裡做出一份力量！',
          type:'success'
        })
      }else{
        this.$message.error('不能空結，請選擇你喜歡的商品！')
      }
    }
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById('order-list').style.height = orderHeight + 'px';
  },
  created() {
    //常用商品数据获取
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response => {
        //console.log(response);
        this.oftenGoods = response.data;
      })
      .catch(error => {
        // console.log(error);
        alert('网络错误，不能访问');
      }),
      //  
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response => {
          console.log(response);
          //this.oftenGoods=response.data;
          this.type0Goods = response.data[0];
          this.type1Goods = response.data[1];
          this.type2Goods = response.data[2];
          this.type3Goods = response.data[3];

        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
  }
}
</script>
<style scoped>
.pos-order {
  background-color: #f9fafc;
  border: 1px solid #c0ccda;
}

.div-btn {
  margin-top: 20px;
}

.title {
  height: 20px;
  border-bottom: 1px solid #D3DCE6;
  background-color: #F9FAFC;
  padding: 10px;
}

.often-goods-list {
  overflow: hidden;
}

.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #E5E9F2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}

.o-price {
  color: #58B7FF;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 6px;
  cursor: pointer;
}

.cookList li span {

  display: block;
  float: left;
}

.foodImg {
  width: 40%;
}

.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}

.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}

.div-total {
  padding: 10px;
  background-color: #F9FAFC;
  border-bottom: 1px solid #ddd;
}
</style>


