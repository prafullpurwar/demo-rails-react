
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Link,
    Button
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },
    label: {
        textTransform: 'capitalize',
        paddingBottom: '10px',
        paddingTop: '5px'
    },
    card: {
        backgroundColor: theme.palette.background.default,
        textAlign: 'center'
    }
}))

export default function AltCard(props) {
    const classes = useStyles()
    const {data} = props
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {data.map(elem => (
                    <Grid  item xs={6} key={data.indexOf(elem)}>
                        <Card className={classes.card}>

                            <CardContent style={{
                                verticalAlign: 'middle'}}>
                                <Typography variant="h5" color="primary">{elem.text}</Typography>
                                
                                <div>
                                    {elem.data.map(
                                        element=>(
                                            <div style={{display: 'inline-block', padding: 30}}>
                                            <Typography variant="h5" color="secondary">{element.count}</Typography>
                                            <Typography className={classes.label}>{element.label}</Typography>
                                            <Button variant="containedPrimary" onClick={() => props.onClick(element.label)}>Filter</Button>
                                            </div>
                                        )
                                    )}
                                    
                                </div>
                            </CardContent>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}