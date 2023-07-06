export interface ProfileDto {
	uid: string;
	reader_number: string; // Читательский билет
	email: string;
	login: string; // На текущий момент используется номер мобильного телефона
	password: string; // Хэш
	firstname: string;
	lastname: string;
	middlename: string;
	photo_link: string; // Ссылка на фотографию из ГЗЧ
	gender: string; // male or female
	birthday: string;
	phone: string;
	mobile_phone: string;
	passport_number: string;
	reading_room: number;
	citizenship: number; // гражданство
	residence: number; // проживание
	branch_of_knowledge: number; // отрасль знанией
	reader_category: number; // категория читателя
	registration_address: string;
	home_address: string;
	service_marks: string; // служебные отметки ГЗЧ
	job_study_place: string; // место работы/учебы
	is_rsl_worker: boolean; // сотрудник РГБ
	is_free_card: boolean; // билет выдан бесплатно
	is_duplicate_card: boolean; // дубликат
	is_show_initials_on_card: boolean; // показывать инициалы на читательском билете
	duplicate_reason: number; // причина выдачи дубликата
	is_new_card: boolean; // новый читательский билет
	is_card_payment: boolean; // билет оплачен?
	issuance_card_date: string; // дата выдачи карты
	expire_card_date: string; // дата окончание срока действия билета
	issuance_card_type: string; // gzch remote neb or mail
	// Это массив из структур. Каждая структура содержит идентификатор ВЧЗ признак блокировки и номер причины блокировки.
	// Признак блокировки содержит стандартный справочник причин блокировки.
	connected_rooms: any;
	locks: any;
	archive_cards: any;
	contract_number: string;
	contract_type: number;
	contract_date_start: string;
	contract_date_end: string;
	contract_status: number;
	contract_cost: number;
	contract_note: string;
	contract_archive: any;
	is_block: boolean; // Флаг блокировки пользователя в онлайн
	is_gzch_block: boolean; // Флаг блокировки читателя в ГЗЧ
	block_reason: string; // Причина блокировки
	register_system_id: string; // Система регистрации
	owner_system_id: string; // Принадлежность к системе
	owner_system_type_id: string; // Принадлежность к типу системы
	date_creation: string; // Дата создания
	date_modify: string; // Дата модификации'
}
