import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
  photo?: string;
};

const reviews: Review[] = [
  { id: "r1", name: "Имя участника", role: "Роль / компания", text: "Текст отзыва участника о курсе и полученных результатах." },
  { id: "r2", name: "Имя участника", role: "Роль / компания", text: "Текст отзыва участника о курсе и полученных результатах." },
  { id: "r3", name: "Имя участника", role: "Роль / компания", text: "Текст отзыва участника о курсе и полученных результатах." },
  { id: "r4", name: "Имя участника", role: "Роль / компания", text: "Текст отзыва участника о курсе и полученных результатах." },
];

const ReviewCard = ({ r }: { r: Review }) => (
  <div className="h-full p-6 rounded-xl border border-border bg-background flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      {r.photo ? (
        <img src={r.photo} alt={r.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <User size={22} strokeWidth={1.8} />
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-foreground truncate">{r.name}</p>
        <p className="text-xs text-muted-foreground truncate">{r.role}</p>
      </div>
    </div>
    <p className="text-sm text-foreground leading-relaxed">{r.text}</p>
  </div>
);

const ReviewsSection = () => {
  const useCarousel = reviews.length > 4;

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Отзывы участников</h2>
        </motion.div>

        {useCarousel ? (
          <Carousel opts={{ align: "start" }} className="max-w-6xl mx-auto">
            <CarouselContent>
              {reviews.map((r) => (
                <CarouselItem key={r.id} className="md:basis-1/2 lg:basis-1/4">
                  <ReviewCard r={r} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {reviews.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
