/* eslint-disable */
import * as d3 from 'd3';
import React from 'react';
import Text from './text.js';

export default class PackG extends React.Component {
  static get defaultProps () {
    return {
      colorScale: () => null,
      d: {},
      foreignObject: false,
      id: '',
      idx: 0,
      labels: [],
    };
  }

  static propTypes = {
    colorScale: React.PropTypes.func,
    d: React.PropTypes.object,
    foreignObject: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    id: React.PropTypes.string,
    idx: React.PropTypes.number,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      previous: {},
      r: 0,
      scale: 1,
      scaled: false,
      scaling: false,
      x: 0,
      y: 0,
      fontSize: '5px'
    };
  }

  componentWillReceiveProps (nextProps) {
    // update state on browser resize
    if (nextProps.d.x !== this.props.d.x || nextProps.d.y !== this.props.d.y)
      this.setState({
        r: nextProps.d.r,
        x: nextProps.d.x,
        y: nextProps.d.y,
      });
  }

  updateDimensions = (vizConRect, vizCon) => {
    this.setState({ scaling: true })
    if (!this.state.scaled) {
      this.setState({ previous: this.g.previousElementSibling });
      vizCon.appendChild(this.g);
      const i = d3.interpolate(
        [
          this.state.x,
          this.state.y,
          1,
        ],
        [
          0,
          0,
          vizConRect.width/2/this.state.r,
        ]
      );

      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({
          x: i(t)[0],
          y: i(t)[1],
          scale: i(t)[2],
        });
        if (t > 0.9 || this.state.scaled) {
          timer.stop();
          this.setState({ scaled: true, scaling: false });
          this.displayForeignObjects();
        }
      }, 10);
    } else {
      const i = d3.interpolate(
        [ this.state.x, this.state.y, this.state.scale ],
        [ this.props.d.x, this.props.d.y, 1 ]
      );
      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({ x: i(t)[0], y: i(t)[1], scale: i(t)[2] });
        if (t > 0.9 || !this.state.scaled) {
          timer.stop();
          this.state.previous.parentNode.insertBefore(this.g, this.state.previous.nextSibling);
          this.setState({ scaled: false, scaling: false })
          this.displayForeignObjects();
        }
      }, 10);
    }

    return true;
  }

  handleZoom = () => {
    const vizCon = document.getElementById(`${this.props.id}-visual-container`).firstElementChild.firstElementChild;

    if (!Boolean(vizCon) || vizCon === this.g) return false;

    return this.updateDimensions(vizCon.getBoundingClientRect(), vizCon);

  }

  setTransform = ({idx, total, width, xOffset, yOffset, scaled}) => {
    let thisI = idx/3;
    thisI = thisI.toFixed(2);
    const first = Number(thisI.toString().split('.')[1]);
    const second = Number(thisI.toString().split('.')[0]);
    let x, y;
    switch (total) {
      case 1: return `translate(${-width/2}, ${-width/2})`;
      case 2: {
        x = first === 0
          ? -this.state.r/2
          : 0;
        y = -width/2;
        break;
      }
      case 3: {
        x = first === 0
          ? xOffset
          : first === 33
          ? xOffset + width
          : xOffset + (width * 2);
        y = -width/2;
        break;
      }
      default: {
        x = first === 0
          ? xOffset
          : first === 33
          ? xOffset + width
          : xOffset + (width * 2);

        y = yOffset + (second * width);
      }
    }
    return `translate(${x}, ${y})`;
  }


  getTransform = ({idx, total, width, xOffset, yOffset, scaled}) => {
    if (this.state.scaling) return false;
    if (scaled === 1) {
      while (--total > -1)
      this[`g${total}`].setAttribute('transform', `translate(-${(this.state.r || this.props.d.r) * 0.85}, ${-1 * (this.state.r || this.props.d.r)/1.8 + (total * (this.state.r || this.props.d.r)/2)})`);
      return true;
    }
    if (scaled === -1) {
      while(idx++ < total)
        this[`g${idx}`].setAttribute('transform', this.setTransform({idx, total, width, xOffset, yOffset, scaled}));

      return true;
    }
    return this.setTransform({idx, total, width, xOffset, yOffset, scaled});
  }

  displayForeignObjects = () => {
    if (this.state.scaling) return null;
    console.log(`scaled: ${this.state.scaled}`)
    /*
    return this.state.scaling
      ? false
      : scaled !== 0
      ? this.getTransform({
        total: this.props.foreignObject.length,
        width: (this.state.r || this.props.d.r)/2,
        xOffset: -1 * (this.state.r || this.props.d.r) * 0.75,
        yOffset:-1 * (this.state.r || this.props.d.r)/2,
        scaled,
      })
      :
    */
    const foreignObjects = [];
    this.props.foreignObject.forEach((foreignObject, idx, arr) => {
      foreignObjects.push(
        <div
          key={idx}
          className='foreign-object-data'
          style={{
            fontSize:`${(this.state.r || this.props.d.r)/16}px`,
          }}
        >
          <img
            className='foreign-object-img'
            src={foreignObject.imageUrl}
            height={(this.state.r || this.props.d.r) * 0.20}
            width={(this.state.r || this.props.d.r) * 0.24}
            style={{
              float: 'left',
              marginRight: '2px',
            }}
          />
          <div
            className='foreign-object-text'
            style={{
              display: this.state.scaled ? 'block' : 'none',
              float: 'left',
              clear: 'right',
            }}
          >
            <a
              href={`https://www.twitter.com/${foreignObject.username}`}
              target='_blank'
              style={{
                float:'left',
              }}
            >
              {foreignObject.username}
            </a>
            <span
              style={{
                margin:0,
                marginTop: '2px',
                border: 'none',
                lineHeight: 1.1,
                height: `${(this.state.r || this.props.d.r) * 0.20}px`, width:`${(this.state.r || this.props.d.r) * 1.3}px`,
                display: 'inline-block',
                float: 'left',
                clear: 'left',
              }}
            >
              {foreignObject.tweet.substring(0,90)}
              <a
                href={foreignObject.url}
                target='_blank'
                style={{
                  fontStyle: 'italic',
                }}> ...read more</a>
            </span>
          </div>
          <hr style={{
            display: this.state.scaled ? 'block' : 'none',
            clear: 'both',
            visibility: 'hidden',
          }} />
        </div>
      );
    });

    return foreignObjects;
  }

  render () {
    const {
      colorScale,
      d,
      idx,
      labels,
    } = this.props;
    // virtual scroller: http://bl.ocks.org/billdwhite/36d15bc6126e6f6365d0
    return (
      <g
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          this.handleZoom();
        }}
        ref={(g) => this.g = g}
        transform={`translate(${this.state.x || this.props.d.x}, ${this.state.y || this.props.d.y}) scale(${this.state.scale})`}
      >
        <circle
          className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
          r={this.state.r || this.props.d.r}
          ref={(circle) => this.circle = circle}
          style={{
            fill: d.children ? colorScale(d.depth) : 'white',
            "stroke":"#fff",
            "strokeWidth":"1.5px",
          }}
        />
        { !d.children &&
            <Text
              d={d}
              idx={idx}
              labels={labels}
              scale={this.state.scale}
              r={this.state.r}
            />
        }
        {
          this.props.foreignObject &&
          <g
            className='foreign-object-g'
            transform={`translate(${-(this.state.r || this.props.d.r) * 1.2}, ${-(this.state.r || this.props.d.r) / 2})`}
          >
          <svg
            className='foreign-object-svg'
            height={(this.state.r ||  this.props.d.r) * 1.5}
            version="1.1"
            width={(this.state.r ||  this.props.d.r) * 1.5}
            x={(this.state.r || this.props.d.r)/2 + 2}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            >
             <foreignObject
               x='0' y="0" width='100%'
               height='100%'
               transform="translate(0,0)"
               style={{
                 visibility: !this.state.scaled ? 'visible' : 'visible',
                 overflow: 'hidden',
               }}
              >
                <div style={{
                    height: `${(this.state.r || this.props.d.r) * 1.30}px`,
                    width: '125%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    paddingRight: '25%',
                  }}
                >
                  {this.displayForeignObjects()}
                </div>
              </foreignObject>
            </svg>
          </g>
        }
        {this.props.children || null}
      </g>
    );
  }
}