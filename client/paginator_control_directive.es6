/* jshint esversion: 6 */


function PaginatorControlDirective(){
    return {
      templateUrl :'./paginator_control.html',
      scope:{
        totalValues:'=',
        valuesPerPage:'=',
        pageChangeCallback:'&'
      },
      controller: PaginatorController,
      controllerAs: 'ctrl'
    };
}


class PaginatorController{
  constructor( $scope, PaginatorFactory){
    console.log(PaginatorFactory);
    PaginatorFactory.init($scope.totalValues, $scope.valuesPerPage);
    this.paginatorFactory = PaginatorFactory;
    this.pageChangeCallback = $scope.pageChangeCallback;
    this.pagesList = PaginatorFactory.getPagesRange();
    $scope.$watch('totalValues', () => {
      PaginatorFactory.init($scope.totalValues, $scope.valuesPerPage, 0);
      this.pagesList = PaginatorFactory.getPagesRange();
    });
    console.log("total", $scope.totalValues, $scope.valuesPerPage);
    console.log({ "pageNum": this.pagesList});
  }
  returnHello(){
    return 'Hello';
  }
  changePage(pageNum){
    console.log("In page change", pageNum);
    if(this.paginatorFactory.goToPage(pageNum)){
      console.log(this.pageChangeCallback);
      this.pageChangeCallback({pageNum: pageNum});
    }
  }
  nextPage(){
    console.log("Really here?");
    let pageNum = this.paginatorFactory.currentPage()+1;
    if(this.paginatorFactory.goToPage(pageNum)){
      console.log("Changed page");
      this.pageChangeCallback({pageNum: pageNum});    
    }
  }
  prevPage(){
    console.log("Really here?");
    let pageNum = this.paginatorFactory.currentPage()-1;
    if(this.paginatorFactory.goToPage(pageNum)){
      console.log("Changed page");
      this.pageChangeCallback({pageNum: pageNum});    
    }
  }
  hasPrevPage(){
    return this.paginatorFactory.isValidPage(this.paginatorFactory.currentPage()-1);
  }
  hasNextPage(){
    return this.paginatorFactory.isValidPage(this.paginatorFactory.currentPage()+1);
  }
}

PaginatorController.$inject= [ '$scope', 'paginatorFactory',];

export {PaginatorControlDirective };
