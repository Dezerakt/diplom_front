import React, {useEffect, useState} from 'react';
import {Item} from "semantic-ui-react";
import axios from "axios";

function Catalog(props) {
    const [newAlbums, setNewAlbums] = useState([])
    const back_url = process.env.REACT_APP_BACK_URL
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
        <Item.Group>
            {
                newAlbums.map(item => {
                    return (
                        <Item
                            childKey={1}
                            image={'/images/wireframe/image.png'}
                            header={'\'Header\''}
                            description={'Description'}
                            meta={'Metadata'}
                            extra={'Extra'}
                        />
                    )
                })
            }
        </Item.Group>
    );
}

export default Catalog;