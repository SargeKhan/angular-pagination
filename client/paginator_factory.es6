/*jshint esversion: 6 */

function PaginatorFactory(){
  var self = this;
  self._itemsPerPage = 10;
  self._total = 10;
  self._currentPage = 1;
  self._totalPages = 1;
  self.isValidPageNum = function(num){
    return (num >= 1) && (num <= self._totalPages);
  };


  return {
    init(total, itemsPerPage, currentPage) {
      console.log(itemsPerPage);
      self._itemsPerPage = itemsPerPage;
      self._total = total;
      self._currentPage = (Number.isNaN(Number(currentPage)) && currentPage > 0) ? currentPage : 10;
      self._totalPages = Math.ceil(total/itemsPerPage);
      console.log( self._itemsPerPage , self._total ,self._currentPage  );
    },
    isValidPage(pageNum){
      return self.isValidPageNum(pageNum);
    },
    currentPage() {
      console.log("current");
      return self._currentPage;
    },
    getPagesRange() {
      console.log();
      let array = [];
      for(let i=1; i<=self._totalPages; i++){
        array.push(i);
      }
      return array;
    },
    goToPage(pageNum){
      if( self.isValidPageNum(pageNum)) { self._currentPage = pageNum; return true; } 
      else { return false; }
    }

  };
}


export default PaginatorFactory;
