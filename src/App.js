import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import DataGrid from "./components/datagrid/DataGrid";

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: 150 }}>
      <CssBaseline />
      <Typography variant="h2" color="primary">
        Simple Human Accounting
      </Typography>
      <Typography variant="h6" color="textPrimary">
        Instructions:
        <ol>
          <li>
            Add more data using the add header form. Click button to add data.
          </li>
          <li>Edit cells via clicking on individual cells.</li>
          <li>After changing cell data, press ENTER to commit changes.</li>
          <li>
            Delete row via clicking the trashcan icon on the far-right of the
            row
          </li>
        </ol>
      </Typography>
      <DataGrid />
    </Container>
  );
}

export default App;
