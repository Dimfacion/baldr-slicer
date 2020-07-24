<template>
  <div class="hello">
    <!--<el-input
      placeholder="Filter keyword"
      v-model="filterText">
    </el-input>-->

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      node-key="id"
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>

import BaldrApi from '@/components/services/baldrApi.services'

export default {
  name: "Repository",
  components: {  },
  props: {
  },
  data: () => ({
    filterText: undefined,
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    data:[],
    defaultProfiles: []
  }),
  watch: {
    defaultProfiles: function(val){
      this.data = [];
      var mapPrinters = {};
      for(let i = 0 ; i < val.length; i++) {
        for(let j = 0 ; j < val[i].printers.length; j++) {
          if(mapPrinters[val[i].printers[j].brand]) {
            if(mapPrinters[val[i].printers[j].brand][val[i].printers[j].model]) {
              mapPrinters[val[i].printers[j].brand][val[i].printers[j].model].push(val[i]);
            } else {
              mapPrinters[val[i].printers[j].brand][val[i].printers[j].model] = [val[i]];
            }
          } else {
              mapPrinters[val[i].printers[j].brand] = {};
              mapPrinters[val[i].printers[j].brand][val[i].printers[j].model] = [val[i]];
          }
        }
      }

      for(let i = 0 ; i < Object.keys(mapPrinters).length; i++) {
        let brand = Object.keys(mapPrinters)[i];
        let brandChildren = [];
        for(let j = 0 ; j < Object.keys(mapPrinters[brand]).length; j++) {
          let model = Object.keys(mapPrinters[brand])[j];
          let modelChildren = [];
          for(let k = 0 ; k < mapPrinters[brand][model].length; k++) {
            let printer = mapPrinters[brand][model][k];
            modelChildren.push({id: printer.id, label: printer.name })
          }
          brandChildren.push({label: model, id: brand+model, children: modelChildren});
        }
        this.data.push({label: brand, id: brand, children: brandChildren})
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted: function() {
    BaldrApi.getPublicProfiles().then((response) => response.json()).then((data) => this.defaultProfiles = data.profiles);
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  height: calc(100% - 40px);
  width: 100%;
}

</style>
