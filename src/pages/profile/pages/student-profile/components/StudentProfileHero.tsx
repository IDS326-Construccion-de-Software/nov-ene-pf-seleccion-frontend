import { toAbsoluteUrl } from '@/utils';
import { KeenIcon } from '@/components';

interface StudentProfileHeroProps {
  name?: string;
  studentId?: string;
  email?: string;
  location?: string;
  avatar?: string;
}

const StudentProfileHero = ({
  name = 'Ismael Porfirio Martínez Encarnación',
  studentId = '1077546',
  email = '1077546@est.intec.edu.do',
  location = 'Santo Domingo, Rep. Dom.',
  avatar = '/media/avatars/300-2.png'
}: StudentProfileHeroProps) => {
  return (
    <div className="card">
      <div className="card-body p-0">
        {/* Banner Background */}
        <div 
          className="relative h-56 rounded-t-xl bg-cover bg-center"
          style={{
            backgroundImage: `url('${toAbsoluteUrl('/media/images/2600x1600/Portada.jpg')}')`
          }}
        >
          {/* Profile Image - Centered at bottom of banner */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
            <div className="relative">
              <img
                src={toAbsoluteUrl(avatar)}
                alt={name}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col items-center pt-24 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            {name}
          </h1>

          <div className="flex flex-wrap gap-8 justify-center text-base text-gray-600 dark:text-gray-400">
            {/* Student ID */}
            <div className="flex items-center gap-2">
              <KeenIcon icon="badge" className="text-xl" />
              <span>{studentId}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <KeenIcon icon="geolocation" className="text-xl" />
              <span>{location}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <KeenIcon icon="sms" className="text-xl" />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StudentProfileHero };
