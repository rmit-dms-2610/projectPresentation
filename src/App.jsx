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

			<h1>Object Animacy</h1>

			<h3>Patrick McMahon : Assignment 3 Presentation</h3>

		</header>

		<main>

			<section>

				<h2>1. Synopsis</h2>

				<figure style={{width: '50%', alignSelf: 'center'}}>
					<img src="/images/objectAnimacy.jpg" alt="pixelated slime mould"/>
					<figcaption><em>Object Animacy</em> created w/ Asher Elazary</figcaption>
				</figure>

				<p>
					<a href="https://objectanimacy.patrickhase.xyz/" target={"_blank"}>
						Object Animacy
					</a> is a tactile audiovisual web app developed to interact with digital slime mould. The
					site prompts the user through calibration of a personal interface agent, providing a custom feel for
					communicating with non-human intelligences.
				</p>

				<details>
					<summary>More details...</summary>
					<p style={{marginTop: '1.5rem'}}>
						Object Animacy is a work that explores how a user’s expectations of digital systems are shaped
						by their personal characterisation of it. Users are intended to repeat the core interactive
						prompt/response loop process a number of times, with the repetitions intended to shift its
						characterisation and their mental model of its underlying computational processes.
					</p>
				</details>

			</section>

			<section>

				<h2>2. Creative Context</h2>

				<h3><a href="https://2020.avantwhatever.com/" target={"_blank"}>Avantwhatever Festival 2020</a></h3>

			</section>

			<section>
				<h2>3. Similar Creative Tools</h2>

				<h3>Julian Glander - Art Sqool:</h3>
				{/* !!! Change ALT */}
				<div style={{display: 'flex', gap: '3rem'}}>
					<figure style={{flex: 1}}>
						<img src="/images/Art-Sqool-F.gif" alt="ELIZA program text log"/>
					</figure>
					<figure style={{flex: 1}}>
						<img src="/images/Art-Sqool-G.gif" alt="ELIZA program text log"/>
					</figure>
				</div>
				<h3>MS Paint:</h3>
				{/* !!! Change ALT */}
				<div style={{display: 'flex', gap: '3rem', width: '50%'}}>
					<figure style={{flex: 1}}>
						<img src="/images/Ms-paint-xp.jpg.webp" alt="ELIZA program text log"/>
					</figure>
				</div>
				<h3>Fractal Fantasy - Unction:</h3>
				{/* !!! Change ALT */}
				<div style={{display: 'flex', gap: '3rem'}}>
					<iframe src="https://fractalfantasy.net/#unction" frameBorder="0"></iframe>
				</div>

			</section>

			<section>
				<h2>4. Characterisation</h2>

				<h3>Digital Morphogenesis:</h3>

				<p>
					"the exploration of how shapes, forms, and patterns emerge in nature through the use of
					computational modeling and generative
					systems based on biological, chemical, and physical processes"
					<br/>
					(Webb 2021)
				</p>

				<ul className="ref-box" style={{flex: 1}}>
					<li>
						Webb, J 2021, <em>Morphogenesis Resources</em>, Jason Webb's Github website, accessed 17 October
						2023.
						<a href="https://github.com/jasonwebb/morphogenesis-resources" target="_blank">
							https://github.com/jasonwebb/morphogenesis-resources
						</a>
					</li>
				</ul>

				<div style={{display: 'flex', gap: '3rem'}}>
					<figure style={{flex: 1}}>
						<img src="/images/dla-1.gif" alt="Replika advertisment featuring three digital avatars"/>
						<figcaption>Diffusion Limited Aggregation</figcaption>
					</figure>
					<figure style={{flex: 1}}>
						<img src="/images/physarum.gif" alt="ELIZA program text log"/>
						<figcaption>Slime Mould Simulation</figcaption>
					</figure>
					<figure style={{flex: 1.31}}>
						<img src="/images/slime-mould.jpg" alt="ELIZA program text log"/>
						<figcaption>Slime Mould</figcaption>
					</figure>
				</div>

				<h3>Blob World:</h3>

				<button style={{alignSelf: 'start'}} onClick={() => {
					sectionPlayback('blobWorld')
				}}>►
				</button>

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

				<button style={{alignSelf: 'start'}} onClick={() => {
					sectionPlayback('vangers')
				}}>►
				</button>

				<div style={{display: 'flex', gap: '3rem'}}>
					<figure style={{flex: 1}}>
						<video src="/videos/vangers.mp4" muted={true} className={'vangers'}
						>
						</video>
					</figure>
				</div>

			</section>

			<section>

				<h2>5. Core Features:</h2>

				<h3>Dynamic Texture Mapping:</h3>

				<div style={{display: 'flex', gap: '3rem'}}>

					<OAPainter/>

					<figure style={{flex: 1}}>
						<img src="/images/gts02.png" alt="texture used for Object Animacy painter"/>
						<figcaption>Source Texture</figcaption>
					</figure>

				</div>

				<h3>UI Dialogue:</h3>

				<table>
					<caption>
						Object Animacy prompt arrays
					</caption>
					<thead>
					<tr>
						<th scope="col">Start</th>
						<th scope="col">Middle</th>
						<th scope="col">End</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>please show me a</td>
						<td>n inanimate object</td>
						<td>that is your favourite…</td>
					</tr>
					<tr>
						<td>please draw me a</td>
						<td>valued item</td>
						<td>that is your favourite…</td>
					</tr>
					<tr>
						<td>please paint me a</td>
						<td>beautiful thing</td>
						<td>that is your favourite…</td>
					</tr>
					<tr>
						<td></td>
						<td>detested item</td>
						<td>that is your most treasured…</td>
					</tr>
					<tr>
						<td></td>
						<td>forgotten object</td>
						<td>that you hate…</td>
					</tr>
					<tr>
						<td></td>
						<td>n animal</td>
						<td>that you love…</td>
					</tr>
					<tr>
						<td></td>
						<td>building</td>
						<td>that reminds you of the past…</td>
					</tr>
					<tr>
						<td></td>
						<td>word</td>
						<td>that you most desire…</td>
					</tr>
					<tr>
						<td></td>
						<td>plant</td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td>tree</td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td>n ornament</td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td>sound</td>
						<td></td>
					</tr>

					</tbody>
				</table>


			</section>




		</main>
	</>
  )
}

export default App
