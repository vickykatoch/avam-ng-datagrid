export const UIState = (grid: any) => {
  const index = grid.behavior.columnEnum;
  const state = {
    columnIndexes: [
      index.BA,
      index.BB,
      index.BQTY,
      index.AQTY,
      index.BAGG_QTY,
      index.AAGG_QTY
    ],
    noDataMessage: 'No Data to Display',
    backgroundColor: '#e0e4cc',
    font: '15px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    // fixedColumnCount: 1,
    // fixedRowCount: 4,
    rowHeaderBackgroundColor : '#000',
    columnHeaderBackgroundColor : '#000',
    columnHeaderColor : '#fff',
    rowHeaderColor : '#fff',
    fixedLinesHColor : 'green',
    fixedLinesVColor : 'green',
    gridBorder  : true,
    lineColor : 'green',
    showFilterRow :true,
    rowHeaderNumbers : true,
    columnAutosizing: false,
    headerTextWrapping: true,
    halign: 'right',
    renderFalsy: true,
    filterable  :true,
    rows: {
      header: {
        0: {
          height: 25
        }
      }
    },
  };
  grid.addState(state);
};
