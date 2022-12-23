import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Layout from "../Assets/Layout";
import {Link} from "react-router-dom";

function Main(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [newAlbums, setNewAlbums] = useState([])

    useEffect(() => {
        return () => {
            axios.get(back_url + '/api/album/get-all', )
                .then(promise => {
                    setNewAlbums(promise.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);


    return (
        <Layout>
            <h1>Main Page</h1>
            <Grid container spacing={3} style={{
                margin: "auto"
            }}>
                {
                    newAlbums.map(item => {
                        return (
                            <Grid item sx={{ maxWidth: 200 }}>
                                <Link to={'/singer/' + item.ID}>
                                    <CardActionArea style={{
                                        backgroundColor: "gray"
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            width={'auto'}
                                            image={item.image_url}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {item.count}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {item.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Layout>

    );
}

export default Main;