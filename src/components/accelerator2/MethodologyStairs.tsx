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
  fontSize: "1.07421875cqw",
  fontWeight: 400,
  lineHeight: 1.5,
  color: "#1a1a1a",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};

const pStyle: React.CSSProperties = { margin: 0 };

const MethodologyStairs = () => {
  return (
    <div className="methodology-image-offset" style={{ marginTop: "-156px" }}>
      <div className="w-full" style={{ paddingTop: "95px" }}>
        <div
          style={{
            position: "relative",
            width: "min(1492px, 73.6vw)",
            aspectRatio: `${CANVAS_W} / ${CANVAS_H * 1.12}`,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "calc(100% / 1.12)",
              transform: "scale(1.12)",
              transformOrigin: "top center",
            }}
          >
            <section
              className="project-staircase"
              aria-labelledby="project-staircase-title"
              style={{
                position: "relative",
                containerType: "inline-size",
                width: "100%",
                height: "100%",
                aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
                marginLeft: "auto",
                marginRight: "auto",
                overflow: "hidden",
                background: "transparent",
              }}
            >
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
              {/* V0 — tread center 468 */}
              <line x1="397" y1="665" x2="539" y2="665" />
              <line x1="409" y1="652" x2="527" y2="652" />
              <line x1="422" y1="639" x2="514" y2="639" />
              {/* V1 — tread center 648.5 */}
              <line x1="577" y1="555" x2="720" y2="555" />
              <line x1="589" y1="542" x2="708" y2="542" />
              <line x1="602" y1="529" x2="695" y2="529" />
              {/* V2 — tread center 829.5 */}
              <line x1="758" y1="452" x2="901" y2="452" />
              <line x1="770" y1="439" x2="889" y2="439" />
              <line x1="783" y1="426" x2="876" y2="426" />
              {/* V3 — tread center 1008.5 */}
              <line x1="938" y1="349" x2="1079" y2="349" />
              <line x1="950" y1="336" x2="1067" y2="336" />
              <line x1="963" y1="323" x2="1054" y2="323" />
              {/* V4 — tread center 1183.5 */}
              <line x1="1113" y1="247" x2="1254" y2="247" />
              <line x1="1125" y1="234" x2="1242" y2="234" />
              <line x1="1138" y1="221" x2="1229" y2="221" />
            </g>
          </svg>

          {/* V0 */}
          <article className="project-step project-step--v0">
            <h3 style={{ ...stepLabelStyle, left: pct(438, CANVAS_W), top: pct(574, CANVAS_H) }}>V0</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(570, CANVAS_W), top: pct(573, CANVAS_H), width: pct(460, CANVAS_W) }}>
              <p style={pStyle}><strong>Озвучить намерение</strong></p>
              <p style={pStyle}>Получить обратную связь от&nbsp;ИИ</p>
              <p style={pStyle}>Отдать в&nbsp;работу 3 нейронкам</p>
            </div>
          </article>

          {/* V1 */}
          <article className="project-step project-step--v1">
            <h3 style={{ ...stepLabelStyle, left: pct(618, CANVAS_W), top: pct(465, CANVAS_H) }}>V1</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(751, CANVAS_W), top: pct(467, CANVAS_H), width: pct(540, CANVAS_W) }}>
              <p style={pStyle}>Раскритиковать чужую работу</p>
              <p style={pStyle}>Доработать <strong>один модуль / роль</strong></p>
              <p style={pStyle}>Получить обратную связь от&nbsp;людей</p>
            </div>
          </article>

          {/* V2 */}
          <article className="project-step project-step--v2">
            <h3 style={{ ...stepLabelStyle, left: pct(799, CANVAS_W), top: pct(362, CANVAS_H) }}>V2</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(932, CANVAS_W), top: pct(364, CANVAS_H), width: pct(630, CANVAS_W) }}>
              <p style={pStyle}>Описать архитектуру</p>
              <p style={pStyle}>Доработать <strong>один законченный процесс</strong></p>
              <p style={pStyle}>Наполнить данными, протестировать</p>
            </div>
          </article>

          {/* V3 */}
          <article className="project-step project-step--v3">
            <h3 style={{ ...stepLabelStyle, left: pct(978, CANVAS_W), top: pct(259, CANVAS_H) }}>V3</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(1109, CANVAS_W), top: pct(261, CANVAS_H), width: pct(570, CANVAS_W) }}>
              <p style={pStyle}>Стабилизировать, устранить баги</p>
              <p style={pStyle}>Кастомизировать до&nbsp;комфорта</p>
              <p style={pStyle}><strong>Получить киллер фичу</strong></p>
            </div>
          </article>

          {/* V4 */}
          <article className="project-step project-step--v4">
            <h3 style={{ ...stepLabelStyle, left: pct(1153, CANVAS_W), top: pct(157, CANVAS_H) }}>V4</h3>
            <div style={{ ...stepTextBlockStyle, left: pct(1282, CANVAS_W), top: pct(163, CANVAS_H), width: pct(520, CANVAS_W) }}>
              <p style={pStyle}>Описать, согласовать интеграции</p>
              <p style={pStyle}>Развернуть в&nbsp;рабочем контуре</p>
              <p style={pStyle}><strong>Запустить в&nbsp;эксплуатацию</strong></p>
            </div>
          </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyStairs;
