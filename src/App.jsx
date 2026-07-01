import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {gridBorder} from "./styles";

function App() {
    return (
        <Stack spacing={1}>
            <Grid container sx={{justifyContent: "center"}}>
                <Grid size={{xs: 12, sm: 8}} sx={{
                    textAlign: 'center',
                    ...gridBorder
                }}>
                    <header>
                        <h1>Contact List</h1>
                    </header>
                </Grid>
            </Grid>
            <main>
                <Grid container
                      direction="row"
                      spacing={1}
                      size={{xs: 12, sm: 8}}
                      sx={{justifyContent: "center", alignItems: "stretch"}}
                >
                    <Grid size={{xs: 12, sm: 4}} sx={gridBorder}>
                        <ContactList/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}} sx={gridBorder}>
                        <ContactForm/>
                    </Grid>
                </Grid>
            </main>
        </Stack>
    )
}

export default App;