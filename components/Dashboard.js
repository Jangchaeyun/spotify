import SpotifyWebApi from "spotify-web-api-node";
import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };  

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
        <Sidebar/>
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
    </main>
  )
}

export default Dashboard;
