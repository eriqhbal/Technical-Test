import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
   name: "employee",
   initialState: {
      dataEmployee: null
   },
   reducers: {
      setEmployee(state, action){
         state.dataEmployee = action.payload;
      },
      addEmployee(state,action){
         const addEmployee = action.payload;

         const isExistEmployee = state.dataEmployee.find(employee => employee.id === addEmployee.id);

         if(isExistEmployee){
            console.log("Data is Already");
         }else {
            state.dataEmployee = [...state.dataEmployee, addEmployee];
         }
      },
      editEmployee(state,action){
         const getData = action.payload;

         state.dataEmployee = state.dataEmployee.map(item => {
            return item.id === getData.id ? action.payload : item;
         })
      },
      removeEmployee(state,action){
         const id = action.payload;

         state.dataEmployee = state.dataEmployee.filter(data => data.id !== id);
      }
   }
});

export const employeeActions = EmployeeSlice.actions;

export default EmployeeSlice;