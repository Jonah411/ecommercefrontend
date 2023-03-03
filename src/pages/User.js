import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
} from "../feature/profileReducer/authProfile";
import { BASE_URL } from "../constants/ConstaltsVariables";
import AlertToast from "../components/common/AlertToast";
import Menu from "../components/user/Menu";
import ChangeRoll from "../components/user/ChangeRoll";

const User = () => {
  const { data: userData } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [removeUser, { data, isSuccess }] = useRemoveUserMutation();
  const [user, setUser] = useState(userData?.data);
  useEffect(() => {
    setUser(userData?.data);
  }, [userData]);
  const removeUserData = (data) => {
    let user = {
      userId: data,
    };
    console.log(user);
    removeUser(user);
  };
  const [toastData, setToastData] = useState({});

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status === true) {
        setToastData({
          message: data.message,
          type: "success",
          reload: true,
        });
      } else {
        setToastData({
          message: data.message,
          type: "error",
          reload: false,
        });
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (toastData.message) {
      const { message, type, reload } = toastData;
      const options = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
      if (type === "success") {
        toast.success(message, options);
      } else {
        toast.error(message, options);
      }
      if (reload) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
      setToastData({});
    }
  }, [toastData]);
  const columns = [
    {
      name: "User Image",
      selector: (row) => (
        <div>
          <Avatar
            alt="Remy Sharp"
            src={`${BASE_URL}categories/profile-images/${row.pro_image}`}
          />
        </div>
      ),

      sortable: true,
      wrap: true,
    },
    {
      name: "User Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "User Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "User Roll",
      selector: (row) => (
        <div className="d-flex">
          <p className="m-0">{row.roll_id.name}</p>
          <ChangeRoll rollName={row.roll_id.name} userId={row._id} />
          {/* <button
            className="btn btn-link"
            onClick={() => {
              let rollData = {
                userId: row._id,
                newRollId: row.roll_id.name === "admin" ? "user" : "admin",
              };
              changeRoll(rollData);
            }}
          >
            Change
          </button> */}
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={() => removeUserData(row._id)}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        className="data-table-store"
        title={<p>User List</p>}
        columns={columns}
        data={user}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search User"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            <Menu />
            {/* <BrandBanner /> */}
          </Stack>
        }
      />
      <AlertToast />
    </div>
  );
};

export default User;
