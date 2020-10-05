import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import {
  addRowAsync,
  deleteRowAsync,
  updateRowAsync,
  selectRows,
  selectHeaders,
} from "../../features/data/dataSlice";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function EditableCell({ children, dataId, cellName, ...props }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const cellRef = useRef();
  const dispatch = useDispatch();

  const handleCellClick = () => setEdit(true);

  const handleClickAway = () => setEdit(false);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    dispatch(updateRowAsync({ id: dataId, [cellName]: value }));
    setEdit(false);
  };

  return (
    <TableCell
      ref={cellRef}
      onBlur={handleClickAway}
      onClick={handleCellClick}
      {...props}
    >
      {edit ? (
        <TextField
          onKeyPress={handleKeyDown}
          autoFocus
          placeholder={children instanceof String ? children : null}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        children
      )}
    </TableCell>
  );
}

function Actions({ data }) {
  const dispatch = useDispatch();
  return (
    <IconButton onClick={() => dispatch(deleteRowAsync(data.id))}>
      <DeleteIcon />
    </IconButton>
  );
}

function AddForm() {
  const headers = useSelector(selectHeaders);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (values) => {
    dispatch(addRowAsync(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {headers.map(
        (header, index) =>
          header.name !== "actions" && (
            <TextField
              name={header.name}
              inputRef={register({
                required: `Missing ${header.label}`,
              })}
              key={index}
              label={header.label}
              style={{ marginRight: 20 }}
              error={!!errors[header.name]}
              helperText={errors[header.name] && errors[header.name].message}
            />
          ),
      )}
      <Button type="submit" variant="contained" color="primary" size="large">
        Add
      </Button>
    </form>
  );
}

export default function DataGrid() {
  const classes = useStyles();
  const rows = useSelector(selectRows);
  const headers = useSelector(selectHeaders);

  return (
    <>
      <AddForm />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.name}
                  align={header.name === "name" ? "left" : "right"}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row).map(
                  (key, index) =>
                    key !== "id" && (
                      <EditableCell
                        key={Object.keys(row).join("") + index}
                        dataId={row.id}
                        cellName={key}
                        align={key === "name" ? "left" : "right"}
                      >
                        {row[key]}
                      </EditableCell>
                    ),
                )}
                <TableCell align="right">
                  <Actions data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
