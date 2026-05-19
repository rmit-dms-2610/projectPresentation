import { useState } from 'react'
import './App.css'
import OAPainter from './Components/oaPainter'
import Ornament from './Components/ornament'

function App() {

	function sectionPlayback(videoClass){
    let videos = Array.from(document.getElementsByClassName(videoClass));
    videos.forEach(element => {
      element.play()
    });
  }

  return (
    <>
      <header>

				<h3>Patrick McMahon : 3rd Milestone Presentation</h3>

				<h1>Browser Compositions</h1>

			</header>
			<main>

				<section>

					<h2>1. Introduction</h2>

					<h3>Abstract:</h3>

					<div style={{display: 'flex', gap: '1rem'}}>

						<p style={{flex: 4}}>
							Browser Compositions speaks to my creative practice designing with and for interaction in web browsers. Interaction 
							Design is typically focused on the promise of a coherent and transparent user agency leading to user satisfaction, 
							often minimising design techniques which can engage a wider range of possible interface characterisation. My 
							practice-led research grounds itself in established Interaction Design methodologies (Murray, 2012; Norman, 2013; 
							Cooper et al., 2014), creatively interpreting and applying their conventions to allow for a broader palette of user 
							agency and affective communication. Throughout a series of collaborative creative works produced for web browsers 
							I experiment with the expressive potential in purposefully designing against interface transparency through the use 
							of ambiguity, friction and opacity. In reflecting on my practical applications of these qualities I seek to highlight 
							the complex characterisations of interfaces beyond satisfaction and explicate design strategies by which designers 
							may creatively address them.
						</p>

						<ul className="ref-box" style={{flex: 1}}>
							<li>
								Cooper, A, Reimann, R & Cronin 2007, <em>About Face 3: The Essentials of Interaction Design</em>, 
								Wiley, Indianapolis, USA.
							</li>
							<li>
								Murray, J 2012, <em>Inventing the medium: principles of interaction design as a cultural practice</em>, 
								The MIT Press, Cambridge, USA.
							</li>
							<li>
								Norman, D 2013, <em>The Design of Everyday Things</em>, 2nd edn, Basic Books, New York, USA.
							</li>
						</ul>

					</div>

					<h3>Browser Compositions:</h3>

					<div className="project-gallery">

						<figure>
							<img src="/images/object-animacy_still.PNG" alt="screenshot of Object Animacy website" />
							<figcaption><em>Object Animacy</em> w/ Asher Elazary</figcaption>
						</figure>

						<figure>
							<img src="/images/sunkland-xyz_still.PNG" alt="screenshot of Object Animacy website" />
							<figcaption><em>SUNKLAND.XYZ</em> w/ Amias Hanley</figcaption>
						</figure>

						<figure>
							<img src="/images/room2_still.PNG" alt="screenshot of Object Animacy website" />
							<figcaption><em>room2</em> w/ Anuraag Bhatia</figcaption>
						</figure>

					</div>

					<h4>room2 Contributers:</h4>

					<p>
						amby downs, Joel Spring, 黑芝麻 (Hēi zhī ma), Panda Wong, Wei Huang, Mohamed Chamas, Aarti Jadu, e fishpool, Sam Miers, j, Kayzar,
						Jack Burton, Kate Geck, Kirby Fary, Alexandra Spence, Nina Buchanan, 莎瑜ShāYú, salllvage, R. Rebeiro, Hannah Wu, Tourist Kid, 
						Hextape, Acopia, Princess Diana of Wales, Fia Fiell, Corin, C.FRIM, Mirasia, Cloudy Ku, Ivy, Female Wizard, Marcus Ian McKenzie, 
						r hunter, siri, Low Flung, Mel Huang, miscmeg, Emile Frankel, Hani Hanbali, Izabel
					</p>
					
				</section>

				<section>

					<h2>2. Key Terms</h2>

					<div style={{display: 'flex', gap: '5rem', alignItems: 'stretch'}}>

						<ul className='defList'>
							<li>
								<span>
									<strong>Interface:</strong> <br />
									The interaction between a user and a materially embedded digital system. <br />
								</span>							
							</li>
							<li>
								<span>
									<strong>Satisfaction:</strong> <br />
									Descriptor for positive user experiences, commonly stated as overarching goal within Interaction Design. Generally understood 
									to arise from a combination of usability and aesthetics.
								</span>
							</li>
							<li>
								<span>
									<strong>Transparency/Opacity:</strong> <br />
									An element of a UI’s intended relationship to a user’s awareness and/or focused attention.
								</span>
							</li>
							<li>
								<span>
									<strong>Ambiguity:</strong> <br />
									Intentionally designing for unclear or uncertain interpretation of a system’s intention, purpose or 
									operations. Ambiguity is not a total lack of information, but just enough to allow multiple possible 
									interpretations.
								</span>
							</li>
							<li>
								<span>
									<strong>Friction:</strong> <br />
									Intentionally adding artificial ‘difficulty’ or requirement of user effort to a system. This effort might 
									be literally mechanical, but it may also arise from the effort of interpreting an ambiguous situation or 
									realigning set expectations.
								</span>
							</li>
						</ul>

						<div className='sideOrnament'>
						</div>

					</div>

					

				</section>

				<section>
					<h2>Object Animacy : Interoperability</h2>

					<h3>Digital Morphogenesis:</h3>

					<p>
						"the exploration of how shapes, forms, and patterns emerge in nature through the use of computational modeling and generative 
						systems based on biological, chemical, and physical processes"
						<br />
						(Webb 2021)
					</p>

					<ul className="ref-box" style={{flex: 1}}>
						<li>
							Webb, J 2021, <em>Morphogenesis Resources</em>, Jason Webb's Github website, accessed 17 October 2023.
							<a href="https://github.com/jasonwebb/morphogenesis-resources" target="_blank">
								https://github.com/jasonwebb/morphogenesis-resources
							</a>
						</li>
					</ul>

					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<img src="/images/dla-1.gif" alt="Replika advertisment featuring three digital avatars" />
							<figcaption>Diffusion Limited Aggregation</figcaption>
						</figure>
						<figure style={{flex: 1}}>
							<img src="/images/physarum.gif" alt="ELIZA program text log" />
							<figcaption>Slime Mould Simulation</figcaption>
						</figure>
						<figure style={{flex: 1.31}}>
							<img src="/images/slime-mould.jpg" alt="ELIZA program text log" />
							<figcaption>Slime Mould</figcaption>
						</figure>
					</div>

					<h3>Blob World:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('blobWorld')}}>►</button>
					
					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<video src="/videos/s-r.mp4" muted={true} className={'blobWorld'}>
							</video>
							<figcaption>Sam Rolfes</figcaption>
						</figure>
						<figure style={{flex: 1}}>
							<video src="/videos/a-t-h.mp4" muted={true} className={'blobWorld'}>
							</video>
							<figcaption>Andrew Thomas Huang</figcaption>
						</figure>
					</div>

					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<video src="/videos/j-k.mp4" muted={true} className={'blobWorld'}>
							</video>
							<figcaption>Jesse Kanda</figcaption>
						</figure>
						<figure style={{flex: 1}}>
							<video src="/videos/pk.mp4" muted={true} className={'blobWorld'}>
							</video>
							<figcaption>Pussykrew</figcaption>
						</figure>
					</div>

					<h3>Vangers:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('vangers')}}>►</button>

					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<video src="/videos/vangers.mp4" muted={true} className={'vangers'}
										 >
							</video>
						</figure>
					</div>
					
					<h3>Paint UI layers:</h3>
					

					<div style={{display: 'flex', gap: '3rem'}}>

						<OAPainter />

						<figure style={{flex: 1}}>
							<img src="/images/gts02.png" alt="texture used for Object Animacy painter" />
							<figcaption>Source Texture</figcaption>
						</figure>

					</div>

					<h3>Interoperability:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('xyzaudio')}}>►</button>

					<figure style={{flex: 1}}>
						<video src="/videos/xyz-audio-mix.mp4" muted={true} className={'xyzaudio'}>
						</video>
						<figcaption>SUNKLAND.XYZ</figcaption>
					</figure>
	

				</section>

				<section>
					<h2>SUNKLAND.XYZ : Technical Determination</h2>

															<h3>Edithvale-Seaford Wetlands:</h3>
{/* !!! Change ALT */}
					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<img src="/images/es-wetlands-1.JPG" alt="ELIZA program text log" />
						</figure>
						<figure style={{flex: 1}}>
							<img src="/images/es-wetlands-2.JPG" alt="ELIZA program text log" />
						</figure>
						<figure style={{flex: 1}}>
							<img src="/images/es-wetlands-3.JPG" alt="ELIZA program text log" />
						</figure>
					</div>

					<h3>Complex 2D Environments:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('compEnv')}}>►</button>

					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<video src="/videos/jtm.mp4" muted={true} className={'compEnv'}
										 >
							</video>
							<figcaption>Journey to the Microcosmos</figcaption>
						</figure>
						<figure style={{flex: 1}}>
							<video src="/videos/orb-farm.mp4" muted={true} className={'compEnv'}
										 >
							</video>
							<figcaption>orb.farm</figcaption>
						</figure>
						
					</div>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('iow')}}>►</button>

          <figure style={{flex: 1}}>
							<video src="/videos/iow.mp4" muted={true} className={'iow'}
										 >
							</video>
							<figcaption>In Other Waters</figcaption>
						</figure>


					<h3>Mapping:</h3>
					{/* !!! Change ALT */}
					<div style={{display: 'flex', gap: '3rem'}}>
						<div style={{display: 'flex', flexDirection: 'column', gap: '3rem', flex: 1}}>
							<figure style={{flex: 1}}>
								<img src="/images/counter-map-creator.png" alt="ELIZA program text log" />
							</figure>
							<figure style={{flex: 1}}>
								<video src="/videos/sunkland-map.mp4" muted={true} 
											>
								</video>
							</figure>
						</div>						
						<figure style={{flex: 1}}>
							<img src="/images/xyz-overlap-map.png" alt="ELIZA program text log" />
						</figure>
					</div>
					
					<h3>Technical Determination:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('r2emoji')}}>►</button>

					<figure style={{flex: 1}}>
						<video src="/videos/r2-emoji1.mp4" muted={true} className={'r2emoji'} 
									 >
						</video>
						<figcaption>room2</figcaption>
					</figure>

				</section>

				<section>
					<h2>room2 : Legacy Design</h2>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('r2new')}}>►</button>

					<figure>
            <video src="/videos/room2-new.mp4" muted={true} className={'r2new'}
                     />
            <figcaption>room2 sync</figcaption>
          </figure>

					<h3>Demoscene:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('demo')}}>►</button>

					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<video src="/videos/unreal10-future-crew.mp4" muted={true} className={'demo'}
										 >
							</video>
							<figcaption>The Future Crew</figcaption>
						</figure>
						<figure style={{flex: 1.33}}>
							<video src="/videos/iq.mp4" muted={true} className={'demo'}
										 >
							</video>
							<figcaption>Inigo Quilez</figcaption>
						</figure>
					</div>

					<h3>Framing:</h3>

          <button style={{alignSelf: 'start'}} onClick={() => {sectionPlayback('n10')}}>►</button>

										{/* !!! Change ALT */}
					<div style={{display: 'flex', gap: '3rem'}}>
						<figure style={{flex: 1}}>
							<img src="/images/ms-paint-95.png" alt="ELIZA program text log" />
							<figcaption>MS Paint</figcaption>
						</figure>
						<figure style={{flex: 1.33}}>
							<video src="/videos/n10.mp4" muted={true} className={'n10'}
										>
							</video>
							<figcaption>N10.AS Radio</figcaption>
						</figure>
					</div>

				<h3>Legacy Design:</h3>

				<figure style={{flex: 1}}>
					<figure style={{flex: 1}}>
							<img src="/images/oa-cursor.PNG" alt="ELIZA program text log" />
							<figcaption>Object Animacy Cursor</figcaption>
						</figure>
				</figure>

				</section>

				<section>
					<h2>Conclusion</h2>
					
					<h3>Annotated Portfolio:</h3>

					<iframe width={"100%"} height={"100%"} src={"http://localhost:5173/"}></iframe>

				</section>
			</main>
    </>
  )
}

export default App
