import React from 'react'

const Home = () => (
  <div className='home-wrapper'>
    <h2 className="header">Gloomhaven Character Log</h2>
    <p>This app can be used to keep track of character information and status for the game Gloomhaven.</p>
    <hr/>
    <div className="home-imgs">
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_br.jpg`} alt={'An image of the Brute class'}/>
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_cr.jpg`} alt={'An image of the Cragheart class'}/>
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_mt.jpg`} alt={'An image of the Mindthief class'}/>
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_sc.jpg`} alt={'An image of the Scoundrel class'}/>
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_sw.jpg`} alt={'An image of the Spellweaver class'}/>
      <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_ti.jpg`} alt={'An image of the Tinkerer class'}/>
    </div>
  </div>
)

export default Home
