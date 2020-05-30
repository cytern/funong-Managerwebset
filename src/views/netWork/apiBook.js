const baseUrlLinux = 'http://62.234.29.109:2010/'
const baseUrlWindows = 'http://localhost:2010/'

function getBaseUrl () {
  let serverUrl = window.location.href
  if (serverUrl.indexOf("localhost")> -1) {
    return baseUrlWindows
  }else {
    return baseUrlLinux
  }
}
export default {

  // baseUrl: 'http://localhost:2010/',
  baseUrl: getBaseUrl(),
  login: 'login/loginEveryOne',
  good: {
    goodListPage: 'everyOne/getGood/',
    goodMaxPage: 'everyOne/getGoodPage',
    goodListForType: 'everyOne/getTypeGood/',
    goodTypeList: 'everyOne/getTypes',
    adviceGoodList: 'everyOne/getALLAdvice',
    addGood: 'represent/addGood',
    updateGood: 'represent/updateGood',
    deleteGood: 'represent/deleteGood/',
  },
  order: {
    addOrder: 'customer/addOrder' ,
    getOrderList: 'customer/getOrders/noAuto',
    deleteOrder: 'customer/deleteOrder' ,
    updateOrder: 'customer/updateOrder'
  },
  farmer: {
    getAllFarmer: 'represent/getFarmer/',
    addFarmerExcelManager:getBaseUrl() + 'manager/addFarmerExcel',
    addFarmerExcelRepresent: getBaseUrl()+ 'represent/addFarmerExcel',
    getAllFarmerManager: getBaseUrl() + 'everyManager/getFarmerExcel',
    getAllFarmerRepresent: getBaseUrl() + 'everyRepresent/getFarmerExcel',
    getFarmerSizeManager: getBaseUrl() + 'everyManager/getFarmerSize',
    getFarmerSizeRepresent: getBaseUrl() + 'everyRepresent/getFarmerSize',
    deleteFarmer: "manager/deleteFarmer/"
  },
  represent: {
    getAllRepresent: 'manager/getRepresent',
    getRepresentExcel: getBaseUrl() + 'everyManager/getRepresentExcel/',
    getRepresentExcelSize:getBaseUrl() + 'everyManager/getRepresentExcelSize/',
    addRepresentExcel:getBaseUrl() + 'manager/addRepresentExcel',
    updateRepresent: 'represent/updateRepresent'
  },
  upLoad: {
    uploadImg: 'everyone/simpleUpload'
  },
  user: {
    addFarmer: 'represent/addFarmer',
    getFarmerDetail : 'represent/getFarmerDetail/',
    updateFarmer: 'represent/updateFarmer',
  },
  manager: {
    getAllManager: 'manager/getAllManager'
  },
  root: {
    getAllRoot: 'root/getAllRoot'
  },
  dataView: {
    representSold: '/represent/getRepresentSold/',
    goodSold: '/represent/getGoodSold/'
  }


}
