import ReviewStar from './ReviewStar'
import { useAuthContext } from '../../Context/AuthContext';

const ProductReviewCard = ({ reviews }) => {
    const { user } = useAuthContext();

    // Function to format date as relative time (e.g., "5 days ago")
    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
            }
        }

        return 'Just now';
    };

    return (
        <div className="mt-16 space-y-5">
            <h3 className="text-2xl font-medium text-[var(--color-ink)] mb-2">Customer Reviews</h3>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="bg-white p-6 rounded-2xl border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-colors">
                        <div className="">
                            <div className="flex items-center justify-between">
                                <div className="text-[var(--color-ink)] font-medium text-sm">
                                    @{user && (user.email.split('@')[0])}
                                </div>
                                <div>
                                    <ReviewStar rating={parseInt(review.rating)} />
                                </div>
                            </div>
                        </div>

                        <p className="text-[var(--color-ink-soft)] mt-3 leading-relaxed text-sm bg-[var(--color-paper-soft)] p-3 rounded-xl">{review.feedback}</p>

                        <div className="mt-3 text-xs text-[var(--color-ink-soft)]">
                            <p className="text-xs text-[var(--color-ink-soft)]">
                                {formatRelativeTime(review.createdAt)}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-[var(--color-paper-soft)] p-6 rounded-2xl text-center">
                    <p className="text-[var(--color-ink-soft)]">No reviews yet. Be the first to review!</p>
                </div>
            )}
        </div>
    )
}

export default ProductReviewCard;