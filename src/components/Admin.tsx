import React from 'react';
import {
    CardContent,
    Typography,
    Stack,
    Grid,
    Paper,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Checkbox,
} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
    downloadDbApi,
    isAdminUser,
} from "../api_handlers/handle";
import { json2csv } from "../utils/utils";
import { TableName } from "../utils/Types";
import ErrorPage from "./ErrorPage";

const tableNameList: Array<TableName> = [
    "users",
    "posts",
    "post_contents",
    "drafts",
    "draft_contents",
    "favorites",
    "follows",
    "likes",
];

function Admin() {
    const [checkedList, setCheckedList] = React.useState([0]);

    const handleToggleCheckbutton = (value: number) => () => {
        const currentIndex = checkedList.indexOf(value);
        const newChecked = [...checkedList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedList(newChecked);
    };

    const handleClickDownload = async () => {
        const checkedDbList = checkedList.map((idx: number) => { return tableNameList[idx]; });
        const res = await downloadDbApi(checkedDbList);
        if (res.status) {
            for (let tableName in res.contents) {
                const jsonOut = json2csv(
                    res.contents[tableName].columns,
                    res.contents[tableName].records,
                );
                const blob = new Blob([jsonOut]);
                const fileDownloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileDownloadUrl;
                link.download = tableName + ".csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(fileDownloadUrl);
            }
        } else {
            console.log("failed");
        }
    }

    const [boolAdminUser, setBoolAdminUser] = React.useState(false);

    React.useEffect(() => {
        const init = async () => {
            const res = await isAdminUser();
            if (res.status) {
                setBoolAdminUser(res.contents.boolAdminUser);
            }
        }
        init();
    }, [])


    const adminPage: React.ReactElement = (
        <CardContent>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <ManageAccountsIcon sx={{ fontSize: 40 }} />
                        <Typography variant="h4">Admin</Typography>
                    </Stack>
                </Grid>

                <Grid item>
                    <Paper sx={{ maxWidth: 360 }}>
                        <CardContent>
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <Typography variant="h5">DB</Typography>
                                </Grid>

                                <Grid item>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {tableNameList.map((value: string, idx: number) => {
                                            const labelId = `checkbox-list-label-${value}`;

                                            return (
                                                <ListItem
                                                    key={value}
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} onClick={handleToggleCheckbutton(idx)} dense>
                                                        <ListItemIcon>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={checkedList.indexOf(idx) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={labelId} primary={value} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={handleClickDownload}
                                        disabled={checkedList.length === 0}
                                    >
                                        DOWNLOAD
                                    </Button>
                                    <a style={{ display: "none" }}
                                    >

                                    </a>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Paper>
                </Grid>
            </Grid>
        </CardContent>
    );

    return (
        boolAdminUser
            ? <div>{adminPage}</div>
            : <ErrorPage errorMessage="Page not found" />
    );
}

export default Admin;