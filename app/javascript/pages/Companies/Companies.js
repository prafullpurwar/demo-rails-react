import React, { useState, useEffect } from 'react'
import PageHeader from "../../components/PageHeader";
import CountGrid from "./CountGrid";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Company from "../../services/companyService";
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    paper: {
        height: 140,
        width: 100
    }
}))


const headCells = [
    { id: 'id', label: 'Id'},
    { id: 'name', label: 'Name' },
    { id: 'users_count', label: 'User Count' },
    { id: 'created_at', label: 'Created At', disableSorting: true },
    { id: 'updated_at', label: 'Updated At', disableSorting: true },
]

export default function Companies() {

    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [countData, setCountData] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    //Fetch companies based on company role and user role with user's count
    const getCompanies = async (role) => {
        const url = `/companies?role=${role}`;
        await fetch(url, { method: 'GET'})
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => setRecords(response.companies))
          .catch(() => this.props.history.push("/"))
    }

    //Fetch count of companies based on comapany and user role
    const getCompanyFilterByRole = async () => {
        const url1 = `/userCountByRoles`;
        await fetch(url1, { method: 'GET'})
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => setCountData(response.user_count_by_roles))
          .catch(() => this.props.history.push("/"))
    }

    useEffect(async () => {
        getCompanyFilterByRole()
        getCompanies("buyer")
    }, [])

    return (
        <>
            
            <PageHeader
                title="Companies"
                subTitle="List of companies"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
                <Paper className={classes.pageContent}>
                <CountGrid className={classes.countGrid} data={countData} onClick={getCompanies}/>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.users_count}</TableCell>
                                        <TableCell>{moment(item.created_at).format('YYYY/MM/DD')}</TableCell>
                                        <TableCell>{moment(item.updated_at).format('YYYY/MM/DD')}</TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>
        </>
    )
}