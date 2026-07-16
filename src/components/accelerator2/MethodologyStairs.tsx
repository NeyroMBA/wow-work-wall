const CANVAS_W = 2048;
const CANVAS_H = 871;

const pct = (v: number, base: number) => `${(v / base) * 100}%`;

const stepLabelStyle: React.CSSProperties = {
  position: "absolute",
  margin: 0,
  fontSize: "3.125cqw",
  fontWeight: 400,
  lineHeight: 1,
  color: "#2461db",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};

const stepTextBlockStyle: React.CSSProperties = {
  position: "absolute",
  fontSize: "0.9765625cqw",
  fontWeight: 400,
  lineHeight: 1.45,
  color: "#1a1a1a",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};

const pStyle: React.CSSProperties = { margin: 0 };

const MethodologyStairs = () => {
  return (
    <div className="methodology-image-offset" style={{ marginTop: "-156px" }}>
      <div className="w-full" style={{ paddingTop: "117px" }}>
        <section
          className="project-staircase"
          aria-labelledby="project-staircase-title"
          style={{
            position: "relative",
            containerType: "inline-size",
            width: "min(1492px, 73.6vw)",
            aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "hidden",
            background: "transparent",
          }}
        >
          <h2
            id="project-staircase-title"
            style={{
              position: "absolute",
              left: "50%",
              top: pct(80, CANVAS_H),
              transform: "translateX(-50%)",
              margin: 0,
              fontFamily: "inherit",
              fontSize: "2.34375cqw",
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#1a1a1a",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Как вы будете собирать проекты
          </h2>

          <svg
            className="project-staircase__geometry"
            aria-hidden="true"
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <path
              d="M 378 677 H 558 V 568 H 739 V 465 H 920 V 362 H 1097 V 260 H 1270 V 165"
              fill="none"
              stroke="#737373"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <g stroke="#737373" strokeWidth={2} strokeLinecap="square">
              {/* V0 */}
              <line x1="393" y1="665" x2="536" y2="665" />
              <line x1="405" y1="652" x2="524" y2="652" />
              <line x1="418" y1="639" x2="511" y2="639" />
              {/* V1 */}
              <line x1="548" y1="555" x2="694" y2="555" />
              <line x1="560" y1="542" x2="682" y2="542" />
              <line x1="573" y1="529" x2="670" y2="529" />
              {/* V2 */}
              <line x1="729" y1="452" x2="878" y2="452" />
              <line x1="741" y1="439" x2="866" y2="439" />
              <line x1="754" y1="426" x2="853" y2="426" />
              {/* V3 */}
              <line x1="941" y1="349" x2="1081" y2="349" />
              <line x1="953" y1="336" x2="1069" y2="336" />
              <line x1="966" y1="323" x2="1056" y2="323" />
              {/* V4 */}
              <line x1="1121" y1="247" x2="1257" y2="247" />
              <line x1="1133" y1="234" x2="1245" y2="234" />
              <line x1="1146" y1="221" x2="1232" y2="221" />
            </g>
          </svg>

          {/* V0 */}
          <article className="project-step project-step--v0">
            <h3 style={{ ...stepLabelStyle, left: pct(428, CANVAS_W), top: pct(574, CANVAS_H) }}>V0</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(570, CANVAS_W), top: pct(589, CANVAS_H), width: pct(440, CANVAS_W) }}>
              <p style={pStyle}><strong>Озвучить намерение</strong></p>
              <p style={pStyle}>Получить обратную связь от&nbsp;ИИ</p>
              <p style={pStyle}>Отдать в&nbsp;работу 3 нейронкам</p>
            </div>
          </article>

          {/* V1 */}
          <article className="project-step project-step--v1">
            <h3 style={{ ...stepLabelStyle, left: pct(607, CANVAS_W), top: pct(472, CANVAS_H) }}>V1</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(750, CANVAS_W), top: pct(486, CANVAS_H), width: pct(520, CANVAS_W) }}>
              <p style={pStyle}>Раскритиковать чужую работу</p>
              <p style={pStyle}>Доработать <strong>один модуль / роль</strong></p>
              <p style={pStyle}>Получить обратную связь от&nbsp;людей</p>
            </div>
          </article>

          {/* V2 */}
          <article className="project-step project-step--v2">
            <h3 style={{ ...stepLabelStyle, left: pct(783, CANVAS_W), top: pct(369, CANVAS_H) }}>V2</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(922, CANVAS_W), top: pct(384, CANVAS_H), width: pct(610, CANVAS_W) }}>
              <p style={pStyle}>Описать архитектуру</p>
              <p style={pStyle}>Доработать <strong>один законченный процесс</strong></p>
              <p style={pStyle}>Наполнить данными, протестировать</p>
            </div>
          </article>

          {/* V3 */}
          <article className="project-step project-step--v3">
            <h3 style={{ ...stepLabelStyle, left: pct(961, CANVAS_W), top: pct(264, CANVAS_H) }}>V3</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(1106, CANVAS_W), top: pct(280, CANVAS_H), width: pct(550, CANVAS_W) }}>
              <p style={pStyle}>Стабилизировать, устранить баги</p>
              <p style={pStyle}>Кастомизировать до&nbsp;комфорта</p>
              <p style={pStyle}><strong>Получить киллер фичу</strong></p>
            </div>
          </article>

          {/* V4 */}
          <article className="project-step project-step--v4">
            <h3 style={{ ...stepLabelStyle, left: pct(1138, CANVAS_W), top: pct(167, CANVAS_H) }}>V4</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(1280, CANVAS_W), top: pct(176, CANVAS_H), width: pct(500, CANVAS_W) }}>
              <p style={pStyle}>Описать, согласовать интеграции</p>
              <p style={pStyle}>Развернуть в&nbsp;рабочем контуре</p>
              <p style={pStyle}><strong>Запустить в&nbsp;эксплуатацию</strong></p>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default MethodologyStairs;
