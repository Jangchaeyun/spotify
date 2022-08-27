import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";
import Poster from "./Poster";

function Body({ spotifyApi, chooseTrack }) {
    const { data: session } = useSession();
    const { accessToken }  = session;
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    },[accessToken]);

    // Searching... 
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        spotifyApi.searchTracks(search).then((res) => {
            setSearchResults(
                res.body.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[0].url,
                        popularity: track.popularity,
                    };
                })
            );
        })
    },[search, accessToken]);

    console.log(searchResults);

    // New Releases...
    useEffect(() => {
        if (!accessToken) return;
    
        spotifyApi.getNewReleases().then((res) => {
            setNewReleases(
                res.body.albums.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.images[0].url,
                    };
                })
            );
        })
    },[accessToken]);
    

    return (
        <section
            className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
            <Search search={search} setSearch={setSearch}/>
            <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
                {searchResults.length === 0 
                    ? newReleases
                        .slice(0, 4)
                        .map((track) => (
                            <Poster 
                                key={track.id}
                                track={track} 
                                chooseTrack={chooseTrack}
                            />
                        ))
                    : searchResults
                        .slice(0, 4)
                        .map((track) => (
                            <Poster 
                                key={track.id}
                                track={track} 
                                chooseTrack={chooseTrack}
                            />
                        ))}
            </div>

            <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
                {/* 장르 */}
                <div className="hidden xl:inline max-w-[270px]">
                    <h2 className="text-white font-bold mb-3">장르</h2>
                    <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
                        <div className="genre">클래식</div>
                        <div className="genre">하우스</div>
                        <div className="genre">미니멀</div>
                        <div className="genre">힙합</div>
                        <div className="genre">일렉</div>
                        <div className="genre">K-pop</div>
                        <div className="genre">발라드</div>
                        <div className="genre">컨트리</div>
                        <div className="genre">테크노</div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default Body;