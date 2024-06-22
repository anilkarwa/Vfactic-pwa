export function transformHeader(header) {
  return header.map((x) => {
    return {
      headerName: x.text,
      field: x.text,
      filter: true,
      floatingFilter: true,
    };
  });
}
export function transformColumnState(header) {
  return header.map((x) => {
    return {
      headerName: x.colId,
      field: x.colId,
      filter: true,
      hide: x.hide,
      floatingFilter: x.floatingFilter,
    };
  });
}
