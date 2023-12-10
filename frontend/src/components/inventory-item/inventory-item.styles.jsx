import styled from "styled-components";

// export const CheckoutItemContainer = styled.div`
//   width: 100%;
//   display: flex;
//   min-height: 100px;
//   border-bottom: 1px solid darkgrey;
//   padding: 15px 0;
//   font-size: 20px;
//   align-items: center;
// `;

export const ImageContainer = styled.div`
  img {
    margin: 5px;
    width: 10%;
    height: 10%;
  }
  width: 10%;
  height: 10%;
`;

export const BaseSpan = styled.span`
  width: 23%;
`;

export const Quantity = styled(BaseSpan)`
  input {
    width: 100%;
  }
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
export const AdminTable = styled.table`
  table-layout: fixed;
  width: 75%;
  min-height: 90vh;
  margin: 50px auto 0;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  input {
    border: None;
    foont-size: 20px;
    height: 100%;
  }

  border-bottom: 1px solid darkgrey;
`;

export const TableCell = styled.td`
  input {
    border: None;
    width: 100%;
  }
  text-transform: capitalize;
  align-items: center;
  padding: 10px;
`;
