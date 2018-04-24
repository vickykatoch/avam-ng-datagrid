export const DefaultUIState = (grid: any) => {
  const index = grid.behavior.columnEnum;

  const state = {
    columnIndexes: [
      // index.INDEX,
      index.BID_ORDER,
      index.BID,
      index.PRICE,
      index.ASK,
      index.ASK_ORDER,
      index.SAP
    ],
    noDataMessage: 'No Data to Display',
    backgroundColor: '#e0e4cc',
    font: '20px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    // cellPadding : 10,
    columnSelection :false,
    defaultRowHeight : 30,
    editable :false,
    gridLinesHColor : '#000',
    gridLinesVColor : 'gray',
    renderFalsy :true,
    rowHeaderBackgroundColor : '#000',
    showRowNumbers:false,
    rowHeaderCheckboxes:false,
    columnHeaderBackgroundColor : '#000101',
    columnHeaderColor : '#fff',
    columnAutosizing: true,

    // autoSelectColumns : false,
    // autoSelectRows :false,
    // fixedColumnCount: 1,
    // fixedRowCount: 4,
    // rowHeaderBackgroundColor : '#000',
    // columnHeaderBackgroundColor : '#000',
    // columnHeaderColor : '#fff',
    // rowHeaderColor : '#fff',
    // fixedLinesHColor : 'green',
    // fixedLinesVColor : 'green',
    // gridBorder  : true,

    // showFilterRow :false,
    // rowHeaderNumbers : true,
    // columnAutosizing: false,
    // headerTextWrapping: true,
    // halign: 'right',
    // filterable  :true,
    rows: {
      header: {
        0: {
          height: 20
        }
      }
    }
  };

  grid.behavior.setHeaders(['Index','Bid Order', 'Bid','Price','Ask', 'Ask Order', 'Sap']);
  var col = grid.behavior.getColumn('bid');
  col.setBackgroundColor('#178fd7');
  col.properties.color = '#fff';

  var col = grid.behavior.getColumn('ask');
  col.setBackgroundColor('	#b22626');
  col.properties.color = '#fff';

  grid.addState(state);
};
