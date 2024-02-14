'use client'
// ActorTable.js
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import EditActorDialog from './EditActorDialog';
import { useHits } from 'react-instantsearch';
const ActorTable = ({ onActorEdit, }) => {
    const { hits: actors } = useHits();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);

    const handleEditClick = (actor) => {
        const { TVseries,
            season,
            date,
            episode,
            year,
            name,
            character,
            ProductCategory,
            imageUrl,
            productLink,
            productTitle,
            alt } = actor
        setSelectedActor({
            TVseries,
            season,
            date,
            episode,
            year,
            name,
            character,
            ProductCategory,
            imageUrl,
            productLink,
            productTitle,
            alt
        });
        setEditDialogOpen(true);
    };
    const handleEditNewClick = () => {
        setSelectedActor({
            TVseries: '',
            season: '',
            date: '',
            episode: '',
            year: '',
            name: '',
            character: '',
            ProductCategory: '',
            imageUrl: '',
            productLink: '',
            productTitle: '',
            alt: '',
        });
        setEditDialogOpen(true);
    };
    const handleEditSave = (editedActor) => {
        onActorEdit(editedActor);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedActor(null);
    };

    return (
        <div>
            <Button onClick={handleEditNewClick}>Add New</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actor</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Season</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Character</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Episode</TableCell>
                            <TableCell>TV Series</TableCell>
                            <TableCell>Product Category</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {actors.map((actor) => (
                            <TableRow key={actor.id}>
                                <TableCell>{actor.name}</TableCell>
                                <TableCell>
                                    <img src={actor.imageUrl} alt={actor.alt} style={{ maxWidth: '50px' }} />
                                </TableCell>
                                <TableCell>{actor.season}</TableCell>
                                <TableCell>{actor.year}</TableCell>
                                <TableCell>{actor.character}</TableCell>
                                <TableCell>{actor.date}</TableCell>
                                <TableCell>{actor.episode}</TableCell>
                                <TableCell>{actor.TVseries}</TableCell>
                                <TableCell>{actor.ProductCategory}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(actor)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedActor && <EditActorDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                actor={selectedActor}

                onSave={handleEditSave}
            />}

        </div>
    );
};

export default ActorTable;


