import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

function Main(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [newAlbums, setNewAlbums] = useState([])

    useEffect(() => {
        return () => {
            axios.get(back_url + '/albums/get-new-albums', {
            })
                .then(promise => {
                    setNewAlbums(promise.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);


    return (
        <div>
            <h1>Main Page</h1>
            <Grid container spacing={3} style={{
                margin: "auto"
            }}>
                {
                    newAlbums.map(item => {
                        return (
                            <Grid item xs={2}>
                                <Card xs={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        width={'auto'}
                                        image="https://i.discogs.com/kA0xdr_dHlLr8i927X8XZ2Lp_mZZ9IeV-9iLPr6rlLs/rs:fit/g:sm/q:90/h:600/w:598/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1MTkw/ODIxLTE2NzAxODQy/ODUtNjMyMy5qcGVn.jpeg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.Name}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {item.Singer}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>

    );
}

export default Main;