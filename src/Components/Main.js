import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../Assets/Layout";
import {Link} from "react-router-dom";
import {Grid, Dimmer, Image, Item, Header, Button} from "semantic-ui-react";
import {hover} from "@testing-library/user-event/dist/hover";

function Main(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [active, setActive] = useState(false);
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

    /*<Item>
        <Item.Image src={item.image_url} size='20'/>
        <Item.Content>
            <Item.Header as={'a'}>{item.name}</Item.Header>
        </Item.Content>
    </Item>*/

    const content = (
        <div>
            <Header as='h2' inverted>
                Title
            </Header>

            <Button primary>Add</Button>
            <Button>View</Button>
        </div>
    )
    return (
        <Layout>
            <h1>Main Page</h1>
            <div style={{
                backgroundImage: `url('https://www.rollingstone.com/wp-content/uploads/2018/06/rs-beatles-70b3b040-a02b-4323-8247-69dbbdd6af10.jpg?w=1500&h=1054&crop=1')`,

                /* Set a specific height */
                minHeight: '500px',

                /* Create the parallax scrolling effect */
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>

            </div>
            <Grid relaxed={true}>
                <Grid.Row columns={6}>
                    {
                        newAlbums.map(item => {
                            return (
                                <Grid.Column
                                    key={item.ID + "-newalbum"}>
                                    <Item.Image src={item.image_url} size={"medium"}/>
                                    <Item.Content>
                                        <Item.Header>{item.name}</Item.Header>
                                    </Item.Content>
                                </Grid.Column>
                            )
                        })
                    }
                </Grid.Row>
            </Grid>
        </Layout>

    );
}

export default Main;