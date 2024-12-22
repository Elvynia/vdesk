import { Injectable } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
	constructor(@InjectModel(Address.name) private readonly AddressModel: Model<Address>) { }

	async create(createAddressInput: CreateAddressInput): Promise<Address> {
		const createdAddress = await this.AddressModel.create(createAddressInput);
		return createdAddress;
	}

	async findAll(): Promise<Address[]> {
		return this.AddressModel.find().exec();
	}

	async findOne(id: number): Promise<Address> {
		return this.AddressModel.findOne({ _id: id }).exec();
	}

	async update(id: number, updateAddressInput: UpdateAddressInput): Promise<Address> {
		return this.AddressModel
			.findByIdAndUpdate({ _id: id }, updateAddressInput, { new: true })
			.exec();
	}

	async remove(id: number): Promise<Address> {
		const deletedAddress = await this.AddressModel
			.findByIdAndDelete({ _id: id })
			.exec();
		return deletedAddress;
	}
}
