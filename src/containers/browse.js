import React, { useState, useEffect, useContext } from "react"
import Fuse from 'fuse.js'
import { Header, Loading, Card, Player } from "../components"
import * as ROUTES from "../constants/routes"
import { FirebaseContext } from "../context/firebase"
import { SelectProfileContainer } from "./profiles"
import { FooterContainer } from "./footer"

export function BrowseContainer({ slides }) {

    const [ profile, setProfile ] = useState({})
    const [ category, setCategory ] = useState("series")
    const [ loading, setLoading ] = useState(true)
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ slideRows, setSlideRows ] = useState([]) 

    const { firebase } = useContext(FirebaseContext)

    // Default Username
    const user = {
        displayName: "Mock User",
        photoURL: "1"
    }

    // 3-second Loading Screen
    useEffect(() => {
        setTimeout(() => {
            // Change Loading state to false
            setLoading(false)
        }, 3000);
    // Dependent array contains user, which re-renders the component when the user state changes
    }, [user])

    // Load SlideRows arrays with data 
    useEffect(() => {
        // Change SlideRows state to the current slide state of current category array
        setSlideRows(slides[category])
    // Dependent array contains slides and categories, which re-renders the component when the user chooses a new category
    }, [slides, category])

    // Start the fuse auto search feature
    useEffect(() => {
        const fuse = new Fuse(slideRows,
            // keys to search are titles, description and genre
            {keys: ['data.title', 'data.description', 'data.genre']})
        // results is an array for the SlideRows state
        const results = fuse.search(searchTerm).map(({item}) => item)
        if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
            // If conditional returns results and search input is more than 3 characters
            setSlideRows(results)
        } else {
            setSlideRows(slides[category])
        }
    // Dependent array contains searchTerm, which re-renders the component when the user changes the search keyword
    }, [searchTerm])

    return (
        // If the current profile has a displayName, then render the following
        profile.displayName ? (
        <>
        {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
                <Header src="vandertorens1" dontShowOnSmallViewPort >
                    <Header.Frame>
                        <Header.Group>
                            <Header.Logo
                                to={ROUTES.HOME}
                                src="/assets/images/misc/logo.svg"
                                alt="Netflix"
                            />
                            <Header.Link
                                active={category === 'series' ? 'true' : 'false'}
                                onClick={() => setCategory('series')}
                            >
                                Series
                            </Header.Link>
                            <Header.Link
                                active={category === 'films' ? 'true' : 'false'}
                                onClick={() => setCategory('films')}
                            >
                                Films
                            </Header.Link>
                        </Header.Group>
                        <Header.Group>
                            <Header.Search 
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                            <Header.Profile>
                                <Header.Picture src={user.photoURL} />
                                <Header.Dropdown>
                                    <Header.Group>
                                        <Header.Picture src={user.photoURL} />
                                        <Header.Link>{user.displayName}</Header.Link>
                                    </Header.Group>
                                    <Header.Group>
                                        <Header.Link
                                            onClick={() => firebase.auth().signOut()}
                                        >
                                            Sign out
                                        </Header.Link>
                                    </Header.Group>
                                </Header.Dropdown>
                            </Header.Profile>
                        </Header.Group>
                    </Header.Frame>

                    <Header.Feature>
                        <Header.FeatureCallOut>
                            Watch Van Der Torens: Fisher Towers now
                        </Header.FeatureCallOut>
                        <Header.Text>
                            Follow the adventures of Chrissypoo and Gigi as they navigate their way around the Colorado Rockies and the canyons of Utah.
                        </Header.Text>
                        <Header.Text>
                            Season 7 now available
                        </Header.Text>
                        <Header.PlayButton>Play</Header.PlayButton>
                    </Header.Feature>
                </Header>

                <Card.Group>
                    {slideRows.map(slideItem => (
                        <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                            <Card.Title>
                                {slideItem.title}
                            </Card.Title>
                            <Card.Entities>
                                {slideItem.data.map(item => (
                                    <Card.Item 
                                        key={item.docId}
                                        item={item}
                                    >
                                        <Card.Image src={`/assets/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                                        <Card.Meta>
                                            <Card.SubTitle>{item.title}</Card.SubTitle>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Meta>
                                    </Card.Item> 
                                ))}
                            </Card.Entities>
                            <Card.Feature category={category}>
                                <Player>
                                    <Player.Button />
                                    <Player.Video />
                                </Player>
                            </Card.Feature>
                        </Card>
                    ))}
                </Card.Group>

                <FooterContainer />
            </>
        ) : (<SelectProfileContainer user={user} setProfile={setProfile} />)
    )
}