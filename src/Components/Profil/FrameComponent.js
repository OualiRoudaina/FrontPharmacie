import "./FrameComponent.css";
import arrow from '../Assets/arrow-down.png';
import arrowright from '../Assets/arrow-right.png';
import settings from '../Assets/settings.png';
import man from '../Assets/man.png';
import transfer from '../Assets/transfer.png';

const FrameComponent = () => {
  return (
    <div className="frame-wrapper">
      <div className="se-dconnecter-parent">
        <div className="se-dconnecter">Se déconnecter</div>
        <img
          className="arrow-down-11998767-4-icon"
          loading="lazy"
          alt=""
          src={arrow}
        />
        <img
          className="arrow-right-13883744-1-icon"
          loading="lazy"
          alt=""
          src={arrowright}
        />
        <div className="rectangle-parent">
          <div className="frame-child" />
          <div className="personaldata-wrapper">
            <div className="personaldata">
              <div className="donnes-personnelles-wrapper">
                <div className="donnes-personnelles">Données personnelles</div>
              </div>
              <img
                className="arrow-down-11998767-1-icon"
                loading="lazy"
                alt=""
                src={arrow}
              />
            </div>
          </div>
          <div className="linesframe">
            <div className="settingsline" />
            <div className="paramtresframe-wrapper">
              <div className="paramtresframe">
                <img
                  className="settings-3524636-1-icon"
                  loading="lazy"
                  alt=""
                  src={settings}
                />
                <div className="paramtres-wrapper">
                  <div className="paramtres">Paramétres</div>
                </div>
                <div className="arrowrightrectangle">
                  <img
                    className="arrow-down-11998767-2-icon"
                    loading="lazy"
                    alt=""
                    src={arrow}
                  />
                </div>
              </div>
            </div>
            <div className="settingsline1" />
            <div className="rectanglecontainer">
              <div className="passwordchange">
                <img
                  className="transfer-3694582-1-icon"
                  loading="lazy"
                  alt=""
                  src={transfer}
                />
                <div className="changer-mot-de">Changer mot de passe</div>
              </div>
              <div className="arrowdownrectangle">
                <img
                  className="arrow-down-11998767-3-icon"
                  loading="lazy"
                  alt=""
                  src={arrow}
                />
              </div>
            </div>
            <img
              className="linesframe-child"
              loading="lazy"
              alt=""
              src="/line-11.svg"
            />
          </div>
        </div>
        <img
          className="man-11311998-1-icon1"
          loading="lazy"
          alt=""
          src={man}
        />
      </div>
    </div>
  );
};

export default FrameComponent;
