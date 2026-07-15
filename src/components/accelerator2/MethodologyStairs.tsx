import stairsAsset from "@/assets/methodology-stairs.png.asset.json";

const MethodologyStairs = () => {
  return (
    <div className="methodology-image-offset" style={{ marginTop: "-156px" }}>
      <div className="w-full" style={{ paddingTop: "117px" }}>
        <img
          src={stairsAsset.url}
          alt="Лестница уровней проекта V0–V4"
          style={{
            width: "min(1492px, 73.6vw)",
            height: "auto",
            aspectRatio: "1492 / 618",
            display: "block",
            objectFit: "contain",
            objectPosition: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default MethodologyStairs;
