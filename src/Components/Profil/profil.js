import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import "./Profil.css";
import arrow from '../Assets/arrow-down.png';
import upload from '../Assets/upload.png';

const Profil = () => {
  return (
    <div className="profil">
      <main className="profil-inner">
        <section className="frame-parent">
          <FrameComponent1 />
          <div className="download-button">
            <div className="tlecharger-ma-fichier-parent">
              
            <div className="paramtresframe">
                <img
                  className="settings-3524636-2-icon"
                  loading="lazy"
                  alt=""
                  src={upload}
                />
                <div className="paramtres-wrapper">
                  <div className="paramtres1">Télécharger mes fichiers</div>
                </div>
                <div className="arrowrightrectangle">
                  <img
                    className="arrow-down-11998767-5-icon"
                    loading="lazy"
                    alt=""
                    src={arrow}
                  />
                </div>
                </div>
             
            </div>
          </div>
          <div className="lineseparator-wrapper">
            <div className="lineseparator" />
          </div>
          <FrameComponent />
        </section>
      </main>
      <div className="profil-child" />
      <div className="profil-item" />
    </div>
  );
};

export default Profil;
