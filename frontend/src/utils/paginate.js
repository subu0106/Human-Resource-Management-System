import _ from "lodash";

export function paginate(items, pageNumber, pageSize){
    const startIndex =(pageNumber-1)*pageSize;
    return _(items).slice(startIndex).take(pageSize).value(); //paginating //slicing the array //taking the number of items
}