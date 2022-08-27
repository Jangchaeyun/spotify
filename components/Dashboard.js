import SpotifyWebApi from "spotify-web-api-node";
import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'


const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

function Dashboard() {
  return (
    <main>
        <Sidebar/>
        <Body SpotifyApi={SpotifyApi} />
        <Right/>
    </main>
  )
}

export default Dashboard;
